import s from './ImageBar.module.scss';
import image from '../../../public/Rick_and_Morty.svg.png'

function ImageBar() {

    return (
        <div className={s.imageBar}>          
            <img src={image} alt="Rick and Morty Logo"/>
        </div>
    );
}

export default ImageBar;