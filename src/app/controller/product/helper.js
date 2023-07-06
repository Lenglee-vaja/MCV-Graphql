const queryWithWhere = (where) => {
    let _where = where || {};
    if (where) {
        if (where.OR) {
            (_where = { ..._where, $or: [...where.OR]}), delete _where.OR;
        }
        if (where.productName) _where.productName = { $regex: where.productName, $options: 'i' }
        if (where.category) _where.category = { $regex: where.category, $options: 'i' }
        if (where.imgPath) _where.imgPath = { $regex: where.imgPath, $options: 'i' }    // $gte = greater than or equal to, $lt= less than

    }
    return _where
}
const queryWithOrderBy = (orderBy) => {
    let result;
    switch (orderBy) {
      case "createdAt_ASC":
        result = { createAt: "asc" };
        break;
      case "createdAt_DESC":
        result = { createAt: "desc" };
        break;
      case "updatedAt_ASC":
        result = { updateAt: "asc" };
        break;
      case "updatedAt_DESC":
        result = { updateAt: "desc" };
        break;
  
      default:
        result = { createAt: "asc" };
        break;
    }
    return result;
  };
module.exports = {
    queryWithWhere,
    queryWithOrderBy
}