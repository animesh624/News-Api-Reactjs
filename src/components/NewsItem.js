import React from 'react'
// This news item is basically each news card that is displayed in out web app.
const NewsItem = (props)=> {
        let { title, description, imageUrl, newsUrl, author, date, source } = props;
        // This is destructuring.Means that we pick the values given in {} from the props which will be passed while calling the component
        // So we can add as many values in {}  that will be passed from another component as props
        return (
            <div className="my-3">
                <div className="card">
                    <div style={{ 
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>  
                    {/* This styling is for the badge which is placed at the top of particular news item. */}
                        <span className="badge rounded-pill bg-danger"> {source} </span> 
                        {/* This span is for badge */}
                    </div>
                    <img src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    {/* if image url is not null then only we will display it else we have one specific image url which will be displayed in place of that image */}
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        )
     
}

export default NewsItem
