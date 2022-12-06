import servicesIcon3 from '../images/services-icon-3.svg';
import servicesIcon2 from '../images/services-icon-2.svg';
import servicesIcon1 from '../images/services-icon-1.svg';
const Home = () => {
  return (
    <div id="services" class="cards-1">
      <div class="container-fluid serv">
        <div class="row">
          <div class="col-lg-12">
            <h2>Why Evolo?</h2>
            <p class="p-heading p-large">All your work in one place: Tasks, docs, chat, goals, and more.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-12">
            <div class="card">
              <img class="card-image" src={servicesIcon3} alt="alternative" />
              <div class="card-body">
                <h4 class="card-title">All in one workspace</h4>
                <p>
                  Track your group's progress and deadlines all in one place. Delivering your team's best work has never
                  been easier.
                </p>
              </div>
            </div>
            <div class="card">
              <img class="card-image" src={servicesIcon2} alt="alternative" />
              <div class="card-body">
                <h4 class="card-title">Ease of work</h4>
                <p>Manage, plan, assign and track everything without ambiguity to deliver your team's best work.</p>
              </div>
            </div>
            <div class="card">
              <img class="card-image" src={servicesIcon1} alt="alternative" />
              <div class="card-body">
                <h4 class="card-title">Coordination</h4>
                <p>
                  Constantly updates the team about the status of the tasks assigned so they can coordinate with their
                  individual work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
