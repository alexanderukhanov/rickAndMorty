import errorImg from "./error.png"

export default function ErrorMessage(props) {
    return (
        <>
            <p>{props.errorMessage}</p>
            <img alt="error.img" id="error_img" src={errorImg}></img>
        </>
    );
}