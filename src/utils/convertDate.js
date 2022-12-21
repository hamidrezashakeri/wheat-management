import moment from "jalali-moment"

export const convertToJalali = (date)=>{
    return moment(date).locale('fa').format('YYYY/MM/DD')
}