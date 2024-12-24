import './styles/style.css';
import './styles/responsive.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Card from './Card';


function App() {
  const [datas, setDatas] = useState(null);
  const [searchItems, setSearchItems] = useState([]);
  const [original, setOriginal] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5173/Data/data.json').then(
      (resp) => resp.json()
    ).then(
      (data) => {
        setDatas(data);
        setOriginal(data);
      }
    ).then(
      (error) => console.log("Cannot fetch data: ", error)
    )
  }, [])

  const handleClick = (event) => {
    document.querySelector('#search-input').style.display = 'flex';
    const btnText = event.target.textContent;
    if (!searchItems.some(itm => itm.text === btnText)) {
      setSearchItems([...searchItems, { text: btnText }]);
    }
    const newData = datas.filter(item => item.role === btnText || item.level === btnText || item.languages.includes(btnText) || item.tools.includes(btnText));
    setDatas(newData);
  }
  const removeSearch = (event) => {
    const targetElement = event.target;
    let parentContainer;
    if (targetElement.classList.contains('svg-child')) {
      parentContainer = targetElement.parentElement.parentElement.parentElement;
    } else if (targetElement.classList.contains('svg')) {
      parentContainer = targetElement.parentElement.parentElement;
    } else if (targetElement.classList.contains('remove-icon')) {
      parentContainer = targetElement.parentElement;
    }
    const btnText = parentContainer.querySelector('.found-search').textContent;
    const newSearch = searchItems.filter(item => item.text != btnText);
    setSearchItems(newSearch);
    let flyList = original;
    newSearch.forEach(search => {
      const newLst = flyList.filter(item => item.role === search.text || item.level === search.text || item.languages.includes(search.text) || item.tools.includes(search.text))
      flyList = newLst;
    });
    setDatas(flyList);
    if (newSearch.length === 0) {
      document.querySelector('#search-input').style.display = 'none';
    }
  }

  const clear = () => {
    setSearchItems([]);
    setDatas(original);
    document.querySelector('#search-input').style.display = 'none';
  }

  return (
    <>
      <div className="container">
        <div className="inner-container">
          <div className="theme">
            <svg
              className="mobile-header"
              xmlns="http://www.w3.org/2000/svg"
              width="375"
              height="156"
            >
              <g fill="#5CA5A5">
                <path
                  fill="#63BABA"
                  fillRule="evenodd"
                  d="M-86.732 487.429c-51.432-51.425-51.438-134.806-.013-186.237l.013-.013L309.926-95.424c51.441-51.434 134.836-51.434 186.277 0C547.634-44 547.64 39.38 496.216 90.813c-.005.004-.01.008-.013.013L99.543 487.429c-51.44 51.433-134.834 51.433-186.275 0zm-444.692 71.824c-51.432-51.424-51.438-134.806-.013-186.237l.013-.013L-134.766-23.6C-83.325-75.034.07-75.034 51.511-23.6c51.431 51.424 51.437 134.805.013 186.237l-.013.013-396.66 396.603c-51.44 51.433-134.834 51.433-186.275 0z"
                />
              </g>
            </svg>
            <svg
              className="desktop-header"
              width="1440"
              height="156"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs><path id="a" d="M0 0h1440v156H0z" /></defs>
              <g fill="none" fillRule="evenodd">
                <mask id="b" fill="#fff"><use xlinkHref="#a" /></mask>
                <use xlinkHref="#a" />
                <g mask="url(#b)" fill="#63BABA">
                  <path
                    d="M495.73 563.419c-51.439-48.795-53.583-130.05-4.788-181.489a128.377 128.377 0 0 1 4.789-4.789l418.16-396.66c55.045-52.215 141.329-52.215 196.374 0 50.418 47.825 53.478 126.835 7.634 178.39l188.06-178.39c55.045-52.215 141.328-52.215 196.373 0 51.44 48.794 53.583 130.049 4.789 181.488a128.377 128.377 0 0 1-4.789 4.789l-418.158 396.658c-55.045 52.215-141.329 52.215-196.374 0-50.418-47.825-53.478-126.835-7.634-178.39L692.104 563.42c-55.045 52.215-141.328 52.215-196.373 0ZM360.464 45.523c-51.44-48.794-53.583-130.05-4.789-181.488a128.377 128.377 0 0 1 4.789-4.79l418.163-396.663c55.046-52.215 141.33-52.215 196.374 0 51.44 48.794 53.583 130.05 4.789 181.488a128.376 128.376 0 0 1-4.789 4.79L556.837 45.522c-55.045 52.215-141.328 52.215-196.373 0Zm-468.795 71.832c-51.439-48.795-53.583-130.05-4.789-181.489a128.377 128.377 0 0 1 4.79-4.788l418.16-396.661c55.045-52.215 141.328-52.215 196.373 0 51.44 48.794 53.583 130.05 4.79 181.488a128.378 128.378 0 0 1-4.79 4.789l-418.16 396.66c-55.045 52.216-141.329 52.216-196.374 0Z"
                  />
                </g>
              </g>
            </svg>
          </div>
          <div id="search-input" className="search-input">
            <div className="items">
              {searchItems && searchItems.map(item => (
                <span onClick={removeSearch} className='search-item' key={item.text}>
                  <span className="found-search">{item.text}</span>
                  <span className="remove-icon">
                    <svg className='svg' xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                      <path
                        className='svg-child'
                        fill="#FFF"
                        fillRule="evenodd"
                        d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"
                      />
                    </svg>
                  </span>
                </span>
              ))}

            </div>
            <span
              className="clear"
              onClick={clear}>
              Clear
            </span>
          </div>
          <div className="main">
            <div className="space"></div>
            {datas && <Card datas={datas} handleClick={handleClick} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default App;