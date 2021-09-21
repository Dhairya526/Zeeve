const get_Dashboard = (req, res) => {
    const userType = req.params.userType;
    switch (userType) {
        case '1':
            res.render('buyerDash');
            break;
        case '2':
            res.render('sellerDash');
            break;
        default:
            res.render('404');
    }
}

module.exports = { get_Dashboard };