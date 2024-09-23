import obj from "./container.js";

// Đối tượng kiểu dáng cho imgTag
const imgTagStyle = {
    position: 'absolute',
    top: '-5rem',
    right: '7rem',
    height: '14rem',
    cursor: 'pointer',
    filter: 'drop-shadow(0 0 10px white)'
};

// Đối tượng kiểu dáng cho imgClick
const imgClickStyle = {
    position: 'absolute',
    top: '2rem',
    right: '10rem',
    height: '7rem',
    filter: 'drop-shadow(0 0 3px white)'
};

// Tạo phần tử imgTag và áp dụng kiểu dáng
const imgTag = document.createElement('img');
imgTag.id = 'imgTag';
imgTag.src = './assets/imgs/pull-switch.png';
Object.assign(imgTag.style, imgTagStyle);

// Tạo phần tử imgClick và áp dụng kiểu dáng
const imgClick = document.createElement('img');
imgClick.src = './assets/imgs/click-here.png';
Object.assign(imgClick.style, imgClickStyle);

// Thêm các phần tử vào container
obj.container.appendChild(imgTag);
obj.container.appendChild(imgClick);

// Hàm xử lý sự kiện click
const handleClick = async () => {
    obj.container.style.backgroundColor = '#f7eded';
    
    // Cập nhật kiểu dáng cho imgTag
    imgTag.style.filter = 'drop-shadow(0 0 10px black)';
    imgTag.style.top = '-3rem';
    imgTag.style.opacity = 0;
    
    // Cập nhật kiểu dáng cho imgClick
    imgClick.style.opacity = 0;

    setTimeout(() => {
        imgTag.remove();
        imgClick.remove();
    }, 800);
};

// Gán sự kiện click cho imgTag
imgTag.addEventListener('click', handleClick);

const text = document.createElement('h3');
text.innerText = 'You have a letter...';

const textStyle = {
    fontSize: '89px',
    margin: 0,
    padding: 0,
    fontFamily: 'PlaywriteAustraliaQLD',
    position: 'absolute',
    bottom: '2%',
    left: '2%',
    opacity: 0,
    transition: 'all 2s linear'
}
text.classList.add('gradient-text');    
Object.assign(text.style, textStyle);

obj.container.appendChild(text);
imgTag.onclick = () => {
    setTimeout(() => {
        text.style.opacity = 1;
    }, 500);    
    setTimeout(() => {
        text.style.opacity = 0;
        setTimeout(() => {
            obj.container.style.transition = 'all .5s ease-in-out';
            obj.container.style.backgroundColor = '#9cdcf0';
            addClouds(18);
            text.remove();
        }, 2000); 
    }, 2500);
}

const createCloud = (cloudField) => {
    let cloud = document.createElement('img');
    cloud.src = './assets/imgs/cloud.png'; // Đường dẫn đến hình ảnh mây

    // Đảm bảo phần tử chứa có thuộc tính CSS position: relative
    cloudField.style.position = 'relative';

    // Kích thước của hình ảnh mây
    const imageWidth = 7.56 * 16; // 1rem = 16px, đổi kích thước từ rem sang px
    const imageHeight = 5 * 16;   // 1rem = 16px, đổi kích thước từ rem sang px

    let cloudStyle = {
        position: 'absolute',
        left: `${Math.floor(Math.random() * (cloudField.clientWidth - imageWidth))}px`,
        top: `${Math.floor(Math.random() * (cloudField.clientHeight - imageHeight))}px`,
        width: '7.56rem',
        height: '5rem',
        // filter: 'drop-shadow(3px 3px 3px black)',
    };

    Object.assign(cloud.style, cloudStyle);
    cloudField.appendChild(cloud);
    return cloud;
};

const addClouds = (numOfClouds) => {
    let zone = document.createElement('div');
    zone.style.width = '94vw';
    zone.style.height = '92vh';
    zone.style.margin = 'auto';
    zone.style.padding = '0';
    zone.style.position = 'relative';

    obj.container.appendChild(zone); 
    let clouds = [];
    for (let i = 0; i < numOfClouds; i++) {
        clouds.push(createCloud(zone));
    }
    return clouds;
};