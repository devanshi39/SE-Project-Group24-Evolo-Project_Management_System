import { useEffect, useState } from 'react';
const Profile = () => {
  const [organisations, setOrganisations] = useState([]);
  useEffect(() => {
    fetchOrg();
    return () => {};
  }, []);

  const fetchOrg = async () => {
    fetch('http://localhost:5000/organisation/user/list', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        console.log(data);
        setOrganisations(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <table className="table profile-table table-borderless">
      <tbody colSpan={2}>
        <tr className="table-head">
          <th colSpan={2}>Profile Information</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>{JSON.parse(localStorage.getItem('user')).name}</td>
        </tr>
        <tr>
          <td>Designation</td>
          <td>Developer</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>{JSON.parse(localStorage.getItem('user')).email}</td>
        </tr>
        <tr>
          <td>Contact</td>
          <td>{JSON.parse(localStorage.getItem('user')).contact || '-'}</td>
        </tr>
        <tr>
          <td>Organization</td>
          <td>{organisations.length > 0 ? organisations.map((item) => item.name).join(', ') : '-'}</td>
        </tr>
      </tbody>
    </table>
  );
};
export default Profile;
