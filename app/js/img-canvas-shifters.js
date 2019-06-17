function Bio() {
    // Img shifter instances
    var opShifter = document.getElementById('op-shifter-1');
    if (opShifter) {
        var bio_ImgShifter_1 = new FollowObject({
            "obj": document.getElementById('op-shifter-1'),
            "activeX": true,
            "scrollCancel": true
        });

        var bio_ImgShifter_2 = new FollowObject({
            "obj": document.getElementById('op-shifter-2'),
            "activeX": true,
            "scrollCancel": true
        });
        RAF.add(bio_ImgShifter_1);
        RAF.add(bio_ImgShifter_2);
    }
}