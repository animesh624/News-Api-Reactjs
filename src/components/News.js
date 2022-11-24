import React, {useEffect, useState} from 'react'

import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
// this.setState() is used to change state in class based component
const News = (props)=>{
    const [articles, setArticles] = useState([])  // This contains the array of article fetched using api
    const [loading, setLoading] = useState(true)  // This denotes whether page has loaded fully or currently in progress
    const [page, setPage] = useState(1)   // This denotes the current page where we are in.In infinite scroll new page are always concatenated after the previous page
    const [totalResults, setTotalResults] = useState(0) // totalResult is the total number of news feteched from api
    
    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 

    const updateNews = async ()=> {
        props.setProgress(10);   // this is the initial progess of top loading bar that will be displayed when the page loads
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;   
        // This url will be used to fecth the news
        setLoading(true)
        let data = await fetch(url);  // Using this we have fetched data from url
        // Fetch Api takes url and return promise
        // async await means that aap isko async krrde aur fetch jo promise return krra uske liye wait kree i.e, async function apne body ke andar wait krr skta h kucch promise ko resolve hone ke liye
        props.setProgress(30);  // To move loading bar more
        let parsedData = await data.json()
        // Now this parsed data contain all the information obtained from the newsapi in the form of json whose sample is saved on sampleOutput.json in this system
        props.setProgress(70);  // move loading bar furthur.
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);  // this is when the page load is completed then we will set the progress of our top loading bar as 100.
    }

    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - NewsLetter`;   
        updateNews();     // These two lines are the effect that will be performed using useEffect
        // eslint-disable-next-line
    }, [])  // []) This line is for that kis effect ke change me hmara useEffect run ho
    // the work that was done by componentDidMount in class based componenet..This work is done by useEffect in function based component


    const fetchMoreData = async () => {     // used in infinite scroll to fetch more data when we will reach the end of current page
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        
        setArticles(articles.concat(parsedData.articles))  //This line will concatenate new data to the present data when we will reach the end of page
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsLetter - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}  
                {/* This means if loading is true then only add spinner component */}


                {/* For using infinite scroll we have to install some package using npm website */}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner/>}
                > 
                {/* Idea of infinite scroll is that we will keep pre data as it is and we will concatenate new data on the previous data */}
                    <div className="container">
                         
                    <div className="row">
                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                {/* Key:While traversing the elements using map we have to give unique key to each element.In our article part the unique element is the url. */}
                                {/* If we do not give key then title bar will show navgation but no loading of category news will happend.When wi give key the remounting of that particular category news happens*/}
                                {/* col-md-4 means that medium devices mee 4 column ki width lelegi.(12 coulumn ki width hoti h bootstrap me) */}
                                <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                {/* ? is used in order to check whether that is null or not..Because slice will give error with null */}
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}


News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News
// Now in this also props are read only so props cannot be changed.
// Now initially if we want to define state then we can call this.state inside constructor and main use of state is that state can be changed