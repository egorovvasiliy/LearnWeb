/**Т.к. props Split не обновляют свое состояние, то придуман этот костыль:более достойных split на просторах интернета пока не нашел*/
export const ResizeSplitTabStations = (s1 = '100%', s2 = '0%') => {
    setTimeout(() => {
        $('#map').closest('.Pane.horizontal').css('flex-basis', s1);
        if (document.getElementById('emptyTab')) $('#emptyTab').closest('.Pane').css('flex-basis', s2);
        window.map2gis.invalidateSize();
    }, 100);
}
export const ResizeSplitTabSchedule = (s1 = '100%', s2 = '0%') => {
    setTimeout(() => {
        $('#map').closest('.Pane.vertical').css('flex-basis', s1);
        if (document.getElementById('emptyScheduleTab'))
            $('#emptyScheduleTab').closest('.Pane.vertical').css('flex-basis', s2);
        window.map2gis.invalidateSize();
    }, 100);
}