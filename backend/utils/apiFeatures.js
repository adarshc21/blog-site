
class ApiFeatures{
  constructor(query, queryStr){
    this.query = query;
    this.queryStr = queryStr;
  }

  search(){
    const keyword = this.queryStr.keyword ? {
      title: {
        $regex: this.queryStr.keyword,
        $options: "i",
      }
    } : {};
    this.query = this.query.find({...keyword});
    return this;
  }

  filter(){
    const queryCopy = {...this.queryStr};
    const removeStr = ['keyword', 'page', 'limit'];
    removeStr.forEach(key => delete queryCopy[key]);

    let queryStr = JSON.stringify(queryCopy);
    queryStr.replace(/\b(lt|lte|gt|gte)\b/, key=> `$${key}`);
    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }


  pagination(pageSize){
    const page = this.queryStr.page || 1;
    const skip =  pageSize * (page - 1);
    this.query = this.query.limit(pageSize).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;