import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  card: {
    maxWidth: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    paddingTop: "150%", // Fixed aspect ratio (adjust as needed)
    overflow: "hidden",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensure image covers the container
  },
}));
//   cardActions: {
//     display: "flex",
//     justifyContent: "flex-end",
//   },
//   cardContent: {
//     display: "flex",
//     justifyContent: "center",
//   },
//   button: {
//     background: "#001524",
//     color: "white",
//     width: "100%",
//     height: "40px",

//     "&:hover": {
//       backgroundColor: "#2a344a",
//       boxShadow: "none",
//     },
//   },
//   cardContentName: {
//     fontSize: 20,
//     textAlign: "center",
//     margin: "4px !important",
//     fontWeight: 500,
//   },
//   cardContentPrice: {
//     fontSize: 20,
//     color: "#F1361D",
//     margin: "0 !important",
//   },
//   "@media (max-width: 700px)": {
//     cardContentName: {
//       fontSize: 14,
//       textAlign: "center",
//     },
//     cardContentPrice: {
//       fontSize: 16,
//     },
//   },
// }));
