using labback.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace labback.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly LibriContext _context;
        private readonly ILogger<NotificationController> _logger;

        public NotificationController(LibriContext context, ILogger<NotificationController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Notification
        [HttpGet]
        public async Task<ActionResult<IEnumerable<NotificationDTO>>> GetNotifications()
        {
            var notifications = await _context.Notifications
                .Include(n => n.exchange)
                    .ThenInclude(e => e.Libri) // Include the related Libri entity
                .Select(n => new NotificationDTO
                {
                    notificationId = n.notificationId,
                    message = n.message,
                    isRead = n.isRead,
                    klientId = n.klientId,
                    exchangeId = n.exchangeId,
                    notificationTime = n.notificationTime,
                    titulli = n.exchange.Libri.Titulli // Map the titulli property
                })
                .ToListAsync();

            return notifications;
        }

        [HttpGet("klient")]
        [Authorize]
        public async Task<IActionResult> GetNotificationsKlient()
        {
            try
            {
                // Extract KlientID from the JWT token
                var klientIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (klientIdClaim == null)
                {
                    return Unauthorized("Invalid token, klient ID not found");
                }

                var klientId = int.Parse(klientIdClaim.Value);

                // Retrieve notifications for the logged-in klient
                var notifications = await _context.Notifications
                    .Where(n => n.klientId == klientId)
                    .ToListAsync();

                // Update the isRead property of each notification to true
                foreach (var notification in notifications)
                {
                    notification.isRead = true;
                }

                // Save changes to the database
                await _context.SaveChangesAsync();

                // Project notifications to NotificationDTO
                var notificationDTOs = notifications.Select(n => new NotificationDTO
                {
                    notificationId = n.notificationId,
                    message = n.message,
                    isRead = n.isRead,
                    klientId = n.klientId,
                    exchangeId = n.exchangeId,
                    notificationTime = n.notificationTime,
                    titulli = n.exchange?.Libri?.Titulli ?? "N/A" // Use null-coalescing operator to handle null values
                }).ToList();

                // Retrieve exchanges expiring in three days or less
                var now = DateTime.Now;
                var threeDaysFromNow = now.AddDays(3);

                var expiringExchanges = await _context.Exchanges
                    .Include(e => e.Libri)
                    .Where(e => e.Status == "Approved" && e.KlientId == klientId && e.ReturnDate <= threeDaysFromNow && e.ReturnDate >= now)
                    .Select(e => new NotificationDTO
                    {
                        notificationId = 0, // No actual notification ID
                        message = $"Dear {e.Klient.Emri}, your exchange period for the book '{e.Libri.Titulli}' expires in three days. Please return the book before the return date.",
                        isRead = true,
                        klientId = e.KlientId,
                        exchangeId = e.ExchangeId,
                        notificationTime = DateTime.Now,
                        titulli = e.Libri.Titulli
                    })
                    .ToListAsync();

                // Combine the notifications and expiring exchanges
                var combinedNotifications = notificationDTOs.Concat(expiringExchanges).ToList();

                // Update the isRead property of expiring exchanges to true
                foreach (var notification in combinedNotifications)
                {
                    notification.isRead = true;
                }

                return Ok(combinedNotifications);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while retrieving notifications");
                return StatusCode(500, "An error occurred while retrieving notifications");
            }
        }



        // GET: api/Notification/unreadCount
        [HttpGet("unreadCount")]
        [Authorize]
        public async Task<IActionResult> GetUnreadNotificationCount()
        {
            try
            {
                // Extract KlientID from the JWT token
                var klientIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
                if (klientIdClaim == null)
                {
                    return Unauthorized("Invalid token, klient ID not found");
                }

                var klientId = int.Parse(klientIdClaim.Value);

                // Count the unread notifications for the logged-in klient
                var unreadCount = await _context.Notifications
                    .Where(n => n.klientId == klientId && !n.isRead)
                    .CountAsync();

                return Ok(unreadCount);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An error occurred while counting unread notifications");
                return StatusCode(500, "An error occurred while counting unread notifications");
            }
        }

        // POST: api/Notification
        [HttpPost]
        public async Task<ActionResult<Notification>> PostNotification(NotificationDTO notificationDTO)
        {
            var notification = new Notification
            {
                message = notificationDTO.message,
                isRead = notificationDTO.isRead,
                klientId = notificationDTO.klientId,
                exchangeId = notificationDTO.exchangeId,
                notificationTime = DateTime.Now // Set the current date and time
            };

            _context.Notifications.Add(notification);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetNotifications), new { id = notification.notificationId }, notification);
        }
    }
}
