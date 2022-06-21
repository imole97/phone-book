import { useEffect, useState, useContext } from "react";
import { ContactContext } from "../../context/contact-context";

const PaginationComponent = ({pages, entries, setCurrentPage}) => {

    const {sortedContacts} = useContext(ContactContext)


  const numOfPages = []
  for (let i = 1; i<=pages; i++){
    numOfPages.push(i)
  }  

  const [currentButton, setCurrentButton] = useState(1)

  useEffect(() => {

    setCurrentPage(currentButton)

  }, [currentButton, setCurrentPage])

  return (
    <>
      <div className="clearfix">
        <div className="hint-text">
          Showing <b>{entries.length}</b> of <b>{sortedContacts.length}</b> entries
        </div>
        <ul className="pagination">
          <li
            className={ `${currentButton === 1? 'page-item disabled' : 'page-item'}`}
            onClick={() =>
              setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
            }
          >
            <a href="#">Previous</a>
          </li>

          {
            numOfPages.map((page, index) =>{
                return (
                  <li
                    key={index}
                    className={`${currentButton === page? 'page-item active' : 'page-item'}`}
                    onClick={()=> setCurrentButton(page)}
                  >
                    <a href="#" className="page-link">
                      {page}
                    </a>
                  </li>
                );
            })
          }

          <li
            className={`${numOfPages.length? 'page-item disabled' : 'page-item'}`}
            onClick={() =>
              setCurrentButton((next) => (next === numOfPages.length ? next : next + 1))
            }
          >
            <a href="#">Next</a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PaginationComponent;
{/* <li className="page-item disabled">
            <a href="#">Previous</a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              1
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              2
            </a>
          </li>
          <li className="page-item active">
            <a href="#" className="page-link">
              3
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              4
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              5
            </a>
          </li>
          <li className="page-item">
            <a href="#" className="page-link">
              Next
            </a>
          </li> */}