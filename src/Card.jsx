const Card = (props) => {
    const {datas, handleClick} = props;
    return ( 
        datas.map(data => (
            <div className={data.featured? 'card border-left': "card"} key={data.id}>
              <div className="card-header">
                <img className="card-svg" src={data.logo} />
                <div className="dev-header">
                  <span className="desc1">{data.company}</span>
                  <span className="descs">
                    {data.new === true ? <span className="desc2">New!</span> : ''}
                    {data.featured === true ? <span className="desc3">Featured</span> : ''}
                  </span>
                  <h3>{data.position}</h3>
                  <div className="dev-status">
                    <span className="last">{data.postedAt}</span>
                    <ul>
                      <li className="last">{data.contract}</li>
                      <li className="last">{data.location}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="role">
                <span onClick={handleClick} className="search-btn">{data.role}</span>
                <span onClick={handleClick} className="search-btn">{data.level}</span>
                {data.languages.map(language => (
                  <span onClick={handleClick} className="search-btn" key={language}>{language}</span>
                ))}
                {data.tools.map(tool => (
                  <span onClick={handleClick} className="search-btn" key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          ))
     );
}
 
export default Card;