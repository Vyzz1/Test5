import { Link } from "react-router-dom";

function LinkDetail(props) {
  const { SelectedAnswers, Count } = props;
  console.log(SelectedAnswers);
  console.log(Count);

  return <Link to="/"> Link</Link>;
}
export default LinkDetail;
