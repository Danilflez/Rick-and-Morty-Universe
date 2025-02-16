import s from './ImageBar.module.scss';

function ImageBar() {

    return (
        <div className={s.imageBar}>          
            <img src='./Rick_and_Morty.svg.png' alt="Rick and Morty Logo"/>
        </div>
    );
}

export default ImageBar;