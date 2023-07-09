const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));
// app.use(function(req, res, next){
//     console.log("MW-1");
//     next();
// });

var contactList = [
    {
        name: "Geeky",
        phone: "1234567890"
    },
    {
        name: "Phoenix",
        phone: "8008580085"
    },
    {
        name: "Yin",
        phone: "0987654321"
    }
];

app.get('/', function (req, res) {
    // console.log(__dirname);
    // res.send('<h1>Hey there,I am running</h1>');

    //------from server displaying and storing using ram
    // return res.render('home', {
    //     title: 'My Contact List',
    //     contact_list: contactList
    // });

    //-----storing and displaying using DB

    Contact.find({}).then((contact) => {
        if (!contact) {
            console.log('Error in fetching contacts from DB');
            return;
        }
        return res.render('home', {
            title: 'My Contact List',
            contact_list: contact
        })

        //for some reason catch err is not working hence patched it using the !contact condition instead of catch error for the Contact.find
        // .catch((err) => {
            // if (err) {
            //     console.log('Error in fetching contacts from DB');
            //     return;
            // }
        // })
    })
});


// Contact.find({}).then((contact)=>{
//     return res.render('home', {
//         title: 'My Contact List',
//         contact_list: contact
//     }).catch((err)=>{
//         if(err){
//             console.log('Error in fetching contacts from DB', err);
//             return;
//     }});



//     function(err, contacts){
//     if(err){
//         console.log('Error in fetching contacts from DB', err);
//         return;
//     }    
//     return res.render('home', {
//         title: 'My Contact List',
//         contact_list: contactList
//     });    
// });
// });

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: 'Practice'

    });
});

app.post('/create_contact', function (req, res) {
    // return res.redirect('/practice');
    // console.log(req.body);

    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });

    // return res.redirect('/');

    // contactList.push(req.body);
    // return res.redirect('back');


    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }).then((newContact) => {
        console.log('********', newContact);
        return res.redirect('back');
    }).catch((err) => {
        console.log('error in creating contact!');
        return;
    });

    //the follwoing code does not work cause it now uses promises not call back function .............https://www.youtube.com/watch?v=dfeQuadvcB0

    // function (err, newContact) {
    //     if (err) {
    //         console.log('error in creating contact!');
    //         return;
    //     }

    //     console.log('********', newContact);
    //     return res.redirect('back');
    // });
});

app.get('/delete-contact', function (req, res) {
    // console.log(req.params);
    let phone = req.query.phone;
    let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    if (contactIndex != -1) {
        contactList.splice(contactIndex, 1);
    }
    return res.redirect('back');
});





app.listen(port, function (err) {
    if (err) {
        console.log('Error in running server', err);
        return console.log("Error");
    }
    return console.log("Express server up and running on port:", port);
});