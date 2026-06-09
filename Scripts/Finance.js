// File: Finance.js
// Date: 2026-06-09
// Author: Gunnar Lidén

// Inhalt
// =============
//
// Main functions for the 'Finance' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variable for the XML bank file
var g_bank_camt_xml = null; 

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Main Functions ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Initialization function for the Finance application
// 1. Loads the XML bank file and creates the XML object
//    Creates the global variable g_bank_camt_xml of type BankCamtXml
function initFinance() 
{
   debugFinance('Initializing Finance application...');

   var sub_dir = 'XmlBank/';
   var xml_bank_camt_file_name = 'BankCamt053.xml';

   var callback_function = onBankCamtXmlLoaded;

   g_bank_camt_xml = new BankCamtXml(sub_dir, xml_bank_camt_file_name, callback_function);

} // initFinance

// Callback function that is called when the XML bank file is loaded and the XML object is created
function onBankCamtXmlLoaded()
{
    debugFinance('Bank CAMT XML file loaded successfully.');

    var n_statements = g_bank_camt_xml.getNumberOfStatements();

    debugFinance('Number of statements in the XML file: ' + n_statements);

    var n_entries = g_bank_camt_xml.getNumberOfEntries(1);

    debugFinance('Number of entries in the XML file: ' + n_entries);

    var statement_number = 1;

    var number_balances = g_bank_camt_xml.getNumberOfBalances(statement_number);

    var iban_number = g_bank_camt_xml.getAccountIban(statement_number);

    debugFinance('IBAN number for statement number ' + statement_number + ': ' + iban_number);

    var opening_balance_amount = g_bank_camt_xml.getAccountBalanceAmount(statement_number, true);

    var closing_balance_amount = g_bank_camt_xml.getAccountBalanceAmount(statement_number, false);

    debugFinance('Opening balance amount for statement number ' + statement_number + ': ' + opening_balance_amount);

    debugFinance('Closing balance amount for statement number ' + statement_number + ': ' + closing_balance_amount);

    debugFinance('Number of balances for statement number ' + statement_number + ': ' + number_balances);

    var entry_number = 197;

    var entry_unique_reference = g_bank_camt_xml.getAccountServicerReference(statement_number, entry_number);

    debugFinance('Unique reference for entry number ' + entry_number + ': ' + entry_unique_reference);

    var entry_amount = g_bank_camt_xml.getAmount(statement_number, entry_number);

    debugFinance('Amount for entry number ' + entry_number + ': ' + entry_amount);

    var booking_date = g_bank_camt_xml.getBookingDate(statement_number, entry_number);

    debugFinance('Booking date for entry number ' + entry_number + ': ' + booking_date);

     var value_date = g_bank_camt_xml.getValueDate(statement_number, entry_number);

    debugFinance('Value date for entry number ' + entry_number + ': ' + value_date);

     var additional_information = g_bank_camt_xml.getAdditionalEntryInformation(statement_number, entry_number);

    debugFinance('Additional entry information for entry number ' + entry_number + ': ' + additional_information);

} // onBankCamtXmlLoaded

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Debug Function ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Displays the input string in the debugger Console
function debugFinance(i_msg_str)
{
    console.log(i_msg_str);

    //UtilServer.appendDebugFile(i_msg_str, 'FinanceDebug.txt');

} // debugFinance

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


