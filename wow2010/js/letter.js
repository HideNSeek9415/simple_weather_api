import obj from './container.js';

const text = document.createElement('h3');
text.innerText = 'You have a letter...';

const textStyle = {
    fontSize: '89px',
    margin: 0,
    padding: 0,
    fontFamily: 'PlaywriteAustraliaQLD'  ,
    position: 'absolute',
    bottom: '2%',
    left: '-100%',
    opacity: 0
}
text.classList.add('gradient-text');    
Object.assign(text.style, textStyle);

obj.container.appendChild(text);
obj.imgTag.onclick = () => {
    text.style.left = '50%';
    text.style.opacity = 1;
    setTimeout(() => {
        text.style.left = '-100%';
        text.style.opacity = 0;
    }, 3000);
}