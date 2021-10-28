import Articles from "../../data/models/article.model";

const ArticleMutations = {

  async createArticle(_:any, { article }, context){
    return await Articles.createArticle(article)
  },

  async updateArticle(_:any, { article }, context){
    return await Articles.updateArticle(article)
  },

  async deleteArticle(_:any, { article }, context){
    return await Articles.deleteArticle(article)
  },

  async toggleLikes(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.likeArticle(userId, optn)
    }
  },
  
  async toggleViews(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.readArticle(userId, optn)
    }
  },

  async toggleSaves(_: any, { articleId, userId, optn }, context){
    const Article = await Articles.findById(articleId)
    if (Article) {
      return await Article.saveArticle(userId, optn)
    }
  },
}

export const ArticleQueries = {
  async articles(){
    const articles = await Articles.find({})
    return articles
  },
  
  async article(_:any, { id }, context){
    const article = await Articles.findById(id)
    return article
  }
}

export default ArticleMutations
