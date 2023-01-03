import "./style/mainButton.scss";

function MainButton(props) {
  return (
    <button className="main-btn" onClick={props.onStartResearch}>
      <span>Search</span>
      {props.children}
    </button>
  );
}

export default MainButton;
