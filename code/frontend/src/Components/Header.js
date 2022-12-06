import headerTeamwork from '../images/header-teamwork.svg';

const Header = () => {
  return (
    <div class="col-lg-6">
      <div class="image-container">
        <img class="img-fluid" src={headerTeamwork} alt="alternative" />
      </div>
    </div>
  );
};
export default Header;