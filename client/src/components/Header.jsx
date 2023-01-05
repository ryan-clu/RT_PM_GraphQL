import rt_logo from './assets/rt_logo_x.png';

export const Header = () => {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
      <div className='container'>
        <a className='navbar-brand' href="/"> 
          <div className="d-flex">
            <img src={rt_logo} alt='logo' className='mr-2' />
            <div>RT_Project_Management</div>
          </div>
        </a>
      </div>
    </nav>
  )
}
