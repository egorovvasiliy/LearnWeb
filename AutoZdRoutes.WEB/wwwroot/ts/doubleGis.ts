import * as DG from "2gis-maps"
//----------------------------------------------------------------------
const idDivElement = 'map';
export const LoadToGlobalMap2gis = () =>
    DG.
        then(() => {
            let initCenter = { lat: 55.6321, lng: 37.8564 };
            let map = DG.map(idDivElement, {
                center: initCenter,
                zoom: 15
            });
            window.map2gis = map;
            window.initCenter = initCenter;
            return map;
        }).
        catch((error:any) => {
            window.SendNotification(error);
        })