import { LatLngExpression } from 'leaflet';
import { User } from "models";

export const getCurrentUser = () => {
    try {
        const user: User = JSON.parse(localStorage.getItem('user') || '');
        return user;
    } catch (error) {
        return null;
    }

}
export const splitWktToLatLng = (wkt: string) => {
    const start = wkt.indexOf('(');
    const end = wkt.indexOf(')');
    const sub = wkt.substring(start + 2, end);
    const rs = sub.split(' ');
    const latLng: LatLngExpression = [Number(rs[1]), Number(rs[0])];
    return latLng
}
export const splitWktTopPostLatLng = (wkt: string) => {
    const start = wkt.indexOf('(');
    const end = wkt.indexOf(')');
    const sub = wkt.substring(start + 2, end);
    const rs = sub.split(' ');
    const latLng: string = rs[0] + " " + rs[1];
    return latLng
}