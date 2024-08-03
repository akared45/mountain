import React from 'react';
const Nav = ({Toggle}) => {
    return (
        <nav className="navbar navbar-expand-sm navbar-white bg-transparent px-3">
            <i className="navbar-brand bi bi-justify-left fs-4" onClick={Toggle}></i>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            ><i className='bi bi-justify'></i>
                <span className="navbar-toggler-icon"></span>
            </button>
        </nav>
    );
}

export default Nav;
