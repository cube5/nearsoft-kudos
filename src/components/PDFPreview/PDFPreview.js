import React from "react";
import {
  Document,
  Page,
  View,
  Image,
  StyleSheet,
  PDFViewer
} from "@react-pdf/renderer";
import PropTypes, { shape } from "prop-types";

const WIDTH = 842 / 4;
const HEIGHT = 595 / 2;

const styles = StyleSheet.create({
  root: {
    width: "100%",
    height: "100%"
  },
  row: {
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "50%"
  },
  image: {
    width: WIDTH,
    height: HEIGHT
  }
});

const Row = ({ images }) => (
  <View style={styles.row}>
    {images.map(img => (
      <Image key={img.id} style={styles.image} src={img.src} />
    ))}
  </View>
);

const PDFPreview = ({ images }) => (
  <PDFViewer style={styles.root}>
    <Document>
      <Page size={"A4"} orientation={"landscape"} wrap>
        <Row images={images.slice(0, 4)} />
        <Row images={images.slice(4, 8)} />
        <Row images={images.slice(8, 12)} />
        <Row images={images.slice(12, 16)} />
      </Page>
    </Document>
  </PDFViewer>
);

PDFPreview.propTypes = {
  images: PropTypes.arrayOf(
    shape({
      src: PropTypes.string.isRequired
    })
  )
};

export default PDFPreview;
