// File: Finance.js
// Date: 2026-06-10
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

// Global variable for the current statement number
var g_current_statement_number = 1;

var g_number_of_entries = 0;

// Global variable for the current entry number
var g_current_entry_number = 1;

// Global variable selected element number in the dropdown control
var g_current_category_number = -12345;

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

   g_current_entry_number = 1;

   var sub_dir = 'XmlBank/';
   var xml_bank_camt_file_name = 'BankCamt053_Details.xml';

   var callback_function = onBankCamtXmlLoaded;

   g_bank_camt_xml = new BankCamtXml(sub_dir, xml_bank_camt_file_name, callback_function);

} // initFinance

// Callback function that is called when the XML bank file is loaded and the XML object is created
function onBankCamtXmlLoaded()
{
    debugFinance('Bank CAMT XML file loaded successfully.');

    g_number_of_entries = g_bank_camt_xml.getNumberOfEntries(g_current_statement_number);

    debugFinance('Number of entries: ' + g_number_of_entries);

    bankDataToConsole();

    createFinanceControls();
    
    setFinanceControls();

} // onBankCamtXmlLoaded

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Main Functions //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Event Functions ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Function that is called when the entry number text box value is changed
function onChangeEntryNumber()
{
    var entry_number_str = g_entry_number_textbox.getValue();

    debugFinance('Entry number changed: ' + entry_number_str);

    var entry_number = parseInt(entry_number_str);

    if (isNaN(entry_number))
    {
        debugFinance('Invalid entry number: ' + entry_number_str);
        return;
    }

    if (entry_number < 1 || entry_number > g_number_of_entries)
    {
        debugFinance('Entry number out of range: ' + entry_number);
        return;
    }

    g_current_entry_number = entry_number;

    debugFinance('Global variable g_current_entry_number set to: ' + g_current_entry_number);

    setFinanceControls();

} // onChangeEntryNumber

// Function that is called when the save button is clicked
function onClickSaveCategoryButton()
{
    debugFinance('Save button clicked.');

} // onClickSaveCategoryButton

// Function that is called when the cancel button is clicked
function onClickCancelCategoryButton()
{
    debugFinance('Cancel button clicked.');

} // onClickCancelCategoryButton

// Function that is called when the upload document button is clicked
function onClickUploadDocumentButton()
{
    debugFinance('Upload document button clicked.');

} // onClickUploadDocumentButton

// Function that is called when the category dropdown selection is changed
function eventSelectCategoryDropDown()
{
    debugFinance('Category dropdown selection changed.');

} // eventSelectCategoryDropDown

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Event Functions /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Set Controls //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Set the values of the controls for the 'Finance' application
function setFinanceControls()
{
    debugFinance('Setting finance controls for entry number: ' + g_current_entry_number);

    g_entry_number_textbox.setValue(g_current_entry_number.toString());

    g_entry_date_textbox.setValue(g_bank_camt_xml.getBookingDate(g_current_statement_number, g_current_entry_number));

    g_entry_ref_number_textbox.setValue(g_bank_camt_xml.getAccountServicerReference(g_current_statement_number, g_current_entry_number));

    var entry_amount = g_bank_camt_xml.getAmount(g_current_statement_number, g_current_entry_number);

     debugFinance('Entry amount: ' + entry_amount);

    g_entry_amount_textbox.setValue(entry_amount);

    var indicator_str = '';

    if (g_bank_camt_xml.isEntryCredit(g_current_statement_number, g_current_entry_number))
    {
        indicator_str = 'Credit';
    }
    else
    {
        indicator_str = 'Debit';
    }

    g_entry_debit_credit_textbox.setValue(indicator_str);

    g_entry_description_textbox.setValue(g_bank_camt_xml.getAdditionalEntryInformation(g_current_statement_number, g_current_entry_number));

    g_entry_deptor_name_textbox.setValue(g_bank_camt_xml.getDebtorName(g_current_statement_number, g_current_entry_number));

    g_entry_deptor_iban_textbox.setValue(g_bank_camt_xml.getDebtorIban(g_current_statement_number, g_current_entry_number));

    g_entry_deptor_address_textbox.setValue(g_bank_camt_xml.getDebtorAddress(g_current_statement_number, g_current_entry_number));

    var entry_amount_sign = null;

    if (g_bank_camt_xml.isEntryCredit(g_current_statement_number, g_current_entry_number))
    {
        entry_amount_sign_str = entry_amount;
    }
    else
    {
        entry_amount_sign_str = -entry_amount;
    }

    g_category_reg_number_textbox.setValue('REG_2026_023');

    g_category_part_amount_textbox.setValue(entry_amount_sign_str);

    g_category_rest_amount_textbox.setValue('0');

    g_category_description_textbox.setValue('');

} // setFinanceControls



///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Set Controls ////////////////////////////////////////////////
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

function bankDataToConsole()
{
     var entry_number = 197;

    entry_number = 58;
    
    debugFinance('Bank data for entry number: ' + entry_number);

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

    var entry_unique_reference = g_bank_camt_xml.getAccountServicerReference(statement_number, entry_number);

    debugFinance('Unique reference for entry number ' + entry_number + ': ' + entry_unique_reference);

    var entry_amount = g_bank_camt_xml.getAmount(statement_number, entry_number);

    debugFinance('Amount for entry number ' + entry_number + ': ' + entry_amount);

    var entry_credit_or_debit_indicator = g_bank_camt_xml.getEntryCreditOrDebitIndicator(statement_number, entry_number);

    debugFinance('Credit or debit indicator for entry number ' + entry_number + ': ' + entry_credit_or_debit_indicator);

    var b_entry_credit = g_bank_camt_xml.isEntryCredit(statement_number, entry_number);

    debugFinance('Is entry credit for entry number ' + entry_number + ': ' + b_entry_credit);

    var booking_date = g_bank_camt_xml.getBookingDate(statement_number, entry_number);

    debugFinance('Booking date for entry number ' + entry_number + ': ' + booking_date);

     var value_date = g_bank_camt_xml.getValueDate(statement_number, entry_number);

    debugFinance('Value date for entry number ' + entry_number + ': ' + value_date);

     var additional_information = g_bank_camt_xml.getAdditionalEntryInformation(statement_number, entry_number);

    debugFinance('Additional entry information for entry number ' + entry_number + ': ' + additional_information);

    var debtor_name = g_bank_camt_xml.getDebtorName(statement_number, entry_number);

    debugFinance('Debtor name for entry number ' + entry_number + ': ' + debtor_name);

    var debtor_iban = g_bank_camt_xml.getDebtorIban(statement_number, entry_number);

    debugFinance('Debtor IBAN for entry number ' + entry_number + ': ' + debtor_iban);

    var debtor_address = g_bank_camt_xml.getDebtorAddress(statement_number, entry_number);

    debugFinance('Debtor address for entry number ' + entry_number + ': ' + debtor_address);

}

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Debug Function //////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////


