const Navbar = () => {
  return (
    <nav className="[background:radial-gradient(40%_155%_at_5%_70%,#000_50%,#da1a32_175%)] text-white">
      <div className="mycontainer flex justify-between items-center px-4 h-14 py-5">
        <div className="logo font-logo text-2xl ">PASSW*RD <span className="font-extrabold text-4xl text-primary ">MANAGER</span> 
        </div>
        {/* <ul>
            <li className="flex gap-4">
                <a className="hover:font-bold" href="/">Home</a>
                <a className="hover:font-bold" href="#">About</a>
                <a className="hover:font-bold" href="#">Contact</a>
            </li>
        </ul> */}
      </div>
    </nav>
  );
};
export default Navbar;
