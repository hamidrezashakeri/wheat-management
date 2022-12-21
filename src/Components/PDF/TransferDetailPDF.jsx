import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { useLocation } from 'react-router-dom';
import moment from 'jalali-moment';
import logo from './1.png';
import source from './Vazir.ttf';
import { numberWithCommas } from '../../utils/commas';
import { convertToJalali } from '../../utils/convertDate';

Font.register({
    family: "vazir",
    src: source
})

const styles = StyleSheet.create({
    page: {
        fontFamily: 'vazir',
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    logo: {
        textAlign: 'right',
        width: '50px',
        height: '50px',
        marginRight: '20px'
    },
    section: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        backgroundColor: '#ddd'
    },
    text: {
        marginLeft: 20,
        textAlign: 'center',
        fontSize: '12px'
    },
    subText: {
        textAlign: 'center',
        fontSize: '8px',
    },
    table: {
        width: '100%',
        position: 'absolute',
        top: '75px',
        fontSize: '10px',
        padding: '10px',
    },
    row: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'row',
        borderTop: '1px solid #EEE',
        paddingTop: 8,
        paddingBottom: 8,
    },
    header: {
        borderTop: 'none',
    },
    bold: {
        fontWeight: 'bold',
    },
    // So Declarative and unDRY 👌
    row1: {
        width: '15%',
    },
    row2: {
        width: '15%',
    },
    row3: {
        width: '27%',
    },
    row4: {
        width: '10%',
    },
    row5: {
        width: '7%',
    },
    viewer: {
        position: 'absolute',
        top: '-80px',
        right: '-300px',
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
});

// Create Document Component
const TransferDetailPDF = (props) => {
    const { state } = useLocation();
    const { transfers, store} = state;
    console.log(state);
    return (
        <PDFViewer style={styles.viewer}>
            {/* Start of the document*/}
            <Document >
                {/*render a single page*/}
                <Page size="A4" style={styles.page}>
                    <View style={styles.section}>
                        <View style={{ marginLeft: '25px' }}>
                            <Text style={styles.subText}>{moment(Date.now()).locale("fa").format('YYYY/MM/DD')}: تاریخ گزارش</Text>
                            <Text style={styles.subText}>تهیه کننده: هادی شااحمدی</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>شرکت تولیدی آرد مریانج کار</Text>
                            <Text style={styles.subText}>{store} گزارش گیری واردات گندم از انبار ذخیره سازی </Text>
                        </View>
                        <Image source={logo} style={styles.logo} />
                    </View>
                    <View style={styles.table}>
                        <View style={[styles.row, styles.bold, styles.header]}>
                            <Text style={styles.row3}>کرایه</Text>
                            <Text style={styles.row2}>شماره پلاک</Text>
                            <Text style={styles.row3}>راننده</Text>
                            <Text style={styles.row4}>توزین</Text>
                            <Text style={styles.row2}>وزن مقصد</Text>
                            <Text style={styles.row2}>وزن مبدا</Text>
                            <Text style={styles.row2}>تاریخ ورود</Text>
                            <Text style={styles.row2}> ردیف</Text>
                        </View>
                        {transfers.map((t,index) => (
                            <View key={t._id} style={styles.row}>
                                <Text style={styles.row3}>
                                    {t.qoutaSale ?numberWithCommas((t.qoutaSale.rentPrice*t.sourceWeight)/1000) : numberWithCommas(t.transferId.rentPrice*t.sourceWeight)}
                                </Text>

                                <Text style={styles.row2}>{t.numberTruck}</Text>
                                <Text style={styles.row3}>{t.driver}</Text>
                                <Text style={styles.row4}>
                                    {t.weightNumber}
                                </Text>
                                <Text style={styles.row2}>{numberWithCommas(t.sourceWeight)}</Text>
                                <Text style={styles.row2}>{numberWithCommas(t.destinationWeight)}</Text>
                                <Text style={styles.row2}>{convertToJalali(t.date)}</Text>
                                <Text style={styles.row2}>{index+1}</Text>
                            </View>
                        ))}

                    </View>
                </Page>
            </Document>
        </PDFViewer>
    );
}
export default TransferDetailPDF;