import "./style/pageWrapper.scss";

function PageWrapper(props) {
  return <div className="page-wrapper">{props.children}</div>;
}

export default PageWrapper;
