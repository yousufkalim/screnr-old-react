 
export default function assetsURL(str){
    return `${process.env.REACT_APP_BASE_URL}${String(str).replace('\\', '\/')}`
}