//---------------------------------------------------------------//
//-----------------------------notes-----------------------------//
//---------------------------------------------------------------//
//Didn't add handling yet for users entering non-numeric characters in the age field.


const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose');
const Crm = require('./models/crm.js')
const prompt = require('prompt-sync')();

const connect = async () => {
    //   // Connect to MongoDB using the MONGODB_URI specified in our .env file.
      await mongoose.connect(process.env.MONGODB_URI);
    //   console.log('Connected to MongoDB');
}

const menu = () => {
    console.log("Choose an option below.\n");
    console.log("1. Create a customer");
    console.log("2. View all customers");
    console.log("3. Update a customer");
    console.log("4. Delete a customer");
    console.log("5. Quit");
    return("");
}

//initial create IF YOU ARE DOWNLOADING THIS FROM GITHUB YOU WILL HAVE TO RUN THIS TO INITIALIZE THE DATA ON YOUR MACHINE.
//You will also probably want your own .env file and .gitignore file.

// const crmDataset =[  
//     { name: 'Basquiat', age: 27},
//     { name: 'Bosch', age: 52},
//     { name: 'Rembrandt', age: 52},
//     { name: 'Banksy', age: 52},
//     { name: 'Kahlo', age: 47},
//     { name: 'Rothco', age: 61}
// ] 
//shoutout to Ian who confirmed that we had to place async before the callback function in order to allow await within the function
// crmDataset.forEach(async(item,index) =>{
//     let receipt = await Crm.create(item)
// })
    // let receipt = await Crm.create(crmDataset[index])
    // console.log(receipt);


////////////////Functions we will be using for our application//////////////////

//Create --TEST ME //WORKS
async function createCustomer(name,age){
    const customer = {name: name, age: age}
    const receipt = await Crm.create(customer)
}

//Read --TEST ME // WORKS //Add not found exception  //WE didn't need to make this.  Only a function that reads all which we had for testing so hijacking that.
async function readCustomer(id){
    const customer = await Crm.findById(id)
    console.log(customer);
    
}


//Update --TEST ME // WORKS //Add not found exception
async function updateCustomer(id,name,age){
    const customer = await Crm.findByIdAndUpdate(id,
        {name: name, age: age}, //The Updatees 
        {new: true}
    )
    console.log(customer);
    
}

//Delete  //WORKS BABY //Add not found exception
async function deleteCustomer(id){
    const customer = await Crm.findByIdAndDelete(id)
    console.log(customer);
    console.log('Customer was deleted'); 
}
//read back the DB
async function readDB() {
    console.log('Below is a list of customers: ');
    
    const crms = await Crm.find({});
    crms.forEach((item) =>{
        console.log(`id: ${item.id} -- Name: ${item.name}, Age: ${item.age}`);     
        
    })
    console.log('\n');
}

function getChoice() {
    console.log(menu());
    return prompt("Choose a number and press Enter: ")    
}

async function main() {
    //console.log(getChoice());
    switch(getChoice()) {    
        
        case '1':
            const createName = prompt("Enter new user\'s name: ");
            const createAge = prompt("Enter new user\'s age: ");
            await createCustomer(createName, createAge);
            break;
        case '2':
            await readDB();
            break;
        case '3':
            await readDB();
            const updateId = prompt("Enter the id of the user you wish to update: ");
            const updateName = prompt("Enter user\'s new name: ");
            const updateAge = prompt("Enter user\'s new age: ");
            await updateCustomer(updateId,updateName,updateAge);
            break;
        case '4':
            await readDB();
            const deleteId = prompt("Enter the id of the user you wish to delete: ");
            await deleteCustomer(deleteId);
            break;
        case '5':
            console.log('Exiting.....');
            await mongoose.connection.close();
            process.exit();
            break;
        default:
            //if you don't choose an option you don't get to leave the menu
            console.log('Bad Read');
            await main();
            break;
            

    }
    main()
}

//This is where the magic happens
async function app(){
    console.log("Welcome to the CRM. Your 1-stop shop for customer management.\n ");
    main()
}

///////////////////////////////App/////////////////////////////////////////
//Connect to DB
connect()
//Run app
app()
