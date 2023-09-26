module.exports = function(template,book){
    let bookTemplate = template.replace('{{title}}',book.title);
    bookTemplate = bookTemplate.replace('{{author}}',book.author);
    bookTemplate = bookTemplate.replace('{{pages}}',book.pages);
    return bookTemplate;
}