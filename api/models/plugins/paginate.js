/* eslint-disable no-param-reassign */
const config = require('../../config');

const paginate = async function (model, filter, options) {
  let order = [];
  if (options.orderBy) {
    options.orderBy.split(',').forEach((sortOption) => {
      order.push(sortOption.includes('-') ? [sortOption.replaceAll('-', ''), 'desc'] : [sortOption]);
    });
  } else {
    order = [['createdAt']];
  }

  const limit = options.limit && parseInt(options.limit, 10) > 0
    ? parseInt(options.limit, 10) : config.defaultPageSize;
  const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
  const offset = (page - 1) * limit;

  const countPromise = model.findAndCountAll({ where: { ...filter } });
  const docsPromise = model
    .findAll({
      where: { ...filter }, offset, limit, order,
    });

  return Promise.all([countPromise, docsPromise]).then((values) => {
    const [{ count: totalResults }, results] = values;
    const totalPages = Math.ceil(totalResults / limit);
    const result = {
      results,
      page,
      limit,
      totalPages,
      totalResults,
    };
    return Promise.resolve(result);
  });
};

module.exports = paginate;
