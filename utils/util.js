const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}


const createPosterConfig = (props) => {
    let {list, info} = props;

    let images = [];
    let texts = [];
    let xo = 54,
        yo = 52;
    let boxW = 100;
    let width = 700,
        height = 750;

    texts.push(...list.map((item, index) => {
        return {
            x: (xo + 100 * index + 20),
            y: yo + 50,
            baseLine: 'middle',
            text: item,
            fontSize: 60,
            zIndex: 50 + index
        }
    }));

    texts.push({
        x: xo,
        y: (yo + boxW + 50),
        text: "释义：",
        fontSize: 25,
        zIndex: 50
    }, {
        x: xo + 10,
        y: (yo + boxW + 50 + 70),
        text: info,
        zIndex: 50,
        fontSize: 40,
        width: 544,
        lineNum: 4,
        lineHeight: 50
    }, {
        x: width / 2,
        y: 710,
        width,
        zIndex:101,
        text: "长按扫一扫, 创作自己的新词",
        fontSize:25,
        textAlign: "center",
        color:"#666",
    });

    images.push(...list.map((item, index) => {
        return {
            width: 100,
            height: 100,
            x: xo + 99 * index,
            y: yo,
            url: "/images/box.jpg",
            zIndex:10 + index
        }
    }));

    images.push({
        width: 150,
        height: 150,
        x: width / 2 - 75,
        y: 530,
        url: "/images/zaoci-logo.jpg",
        zIndex:100
    });

    return {
        width,
        height,
        backgroundColor: '#fff',
        debug: false,
        blocks: [
        ],
        texts: texts,
        images: images
    };
};

module.exports = {
    formatTime: formatTime,
    createPosterConfig
}
