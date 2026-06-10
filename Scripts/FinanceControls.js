// File: FinanceControls.js
// Date: 2026-06-10
// Author: Gunnar Lidén

// Inhalt
// =============
// Create control functions for the 'Finance' application

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Global Parameters /////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Global variable for the entry number text box control
var g_entry_number_textbox= null;

// Global variable for the entry date text box control
var g_entry_date_textbox= null;

// Global variable for the entry reference number text box control
var g_entry_ref_number_textbox= null;

// Global variable for the entry amount text box control
var g_entry_amount_textbox= null;

// Global variable for the entry debit/credit text box control
var g_entry_debit_credit_textbox= null;

// Global variable for the entry description text box control
var g_entry_description_textbox= null;

// Global variable for the entry deptor name text box control
var g_entry_deptor_name_textbox= null;

// Global variable for the entry deptor IBAN text box control
var g_entry_deptor_iban_textbox= null;

// Global variable for the entry deptor address text box control
var g_entry_deptor_address_textbox= null;

// Global variable for the category registration number text box control
var g_category_reg_number_textbox= null;

// Global variable for the category part amount text box control
var g_category_part_amount_textbox= null;

// Global variable for the category description text box control
var g_category_description_textbox= null;

// Global variable for the category rest amount text box control
var g_category_rest_amount_textbox= null;

// Global variable for the category dropdown control
var g_category_dropdown= null;



// Global variable for the category upload document button control
var g_category_upload_document_button= null;

// Global variable for the category save button control
var g_category_save_button= null;

// Global variable for the category cancel button control
var g_category_cancel_button= null;


///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Global Parameters ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// Start Create Controls ///////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////

// Create the controls for the 'Finance' application
function createFinanceControls() 
{
    createTextBoxEntryNumber();

    createTextBoxEntryDate();

    createTextBoxEntryRefNumber();

    createTextBoxEntryAmount();

    createTextBoxEntryDebitCredit();

    createTextBoxEntryDescription();

    createTextBoxEntryDeptorName();

    createTextBoxEntryDeptorIban();

    createTextBoxEntryDeptorAddress();


    createTextBoxCategoryRegNumber();

    createTextBoxCategoryPartAmount();

    createTextBoxCategoryRestAmount();

    createCategoryDropdown();

    createTextBoxCategoryDescription();

    createCategoryUploadDocumentButton();

    createCategorySaveButton();

    createCategoryCancelButton();

} // End createFinanceControls

// Create the text box for the entry number
function createTextBoxEntryNumber()
{
    g_entry_number_textbox = new JazzTextBox("id_select_transaction_textbox", 'id_div_select_transaction_textbox');   
     
    var entry_number_label_str = 'Transaktionsnummer (1 - ' + g_number_of_entries.toString() + ') ';

     debugFinance('Entry number label string: ' + entry_number_label_str);
     
    g_entry_number_textbox.setLabelText(entry_number_label_str);

    g_entry_number_textbox.setLabelTextPositionLeft();

    g_entry_number_textbox.setSize("4");

    g_entry_number_textbox.setReadOnlyFlag(false);

    g_entry_number_textbox.setOninputFunctionName("onChangeEntryNumber");

    g_entry_number_textbox.setTitle("Transaktionsnummer eingeben." + "\n ");

} // createTextBoxEntryNumber

// Create the text box for the entry date
function createTextBoxEntryDate()
{
    g_entry_date_textbox = new JazzTextBox("id_transaction_date_textbox", 'id_div_transaction_date_textbox');    

    g_entry_date_textbox.setLabelText("Datum ");

    g_entry_date_textbox.setLabelTextPositionAbove();

    g_entry_date_textbox.setSize("8");

    g_entry_date_textbox.setReadOnlyFlag(true);

    g_entry_date_textbox.setTitle("Transaktionsdatum wird gezeigt." + "\n ");

} // createTextBoxEntryDate

// Create the text box for the entry date
function createTextBoxEntryRefNumber()
{
    g_entry_ref_number_textbox = new JazzTextBox("id_reference_number_textbox", 'id_div_reference_number_textbox');    

    g_entry_ref_number_textbox.setLabelText("Referenznummer ");

    g_entry_ref_number_textbox.setLabelTextPositionAbove();

    g_entry_ref_number_textbox.setSize("8");

    g_entry_ref_number_textbox.setReadOnlyFlag(true);

    g_entry_ref_number_textbox.setTitle("Referenznummer wird gezeigt." + "\n ");

} // createTextBoxEntryRefNumber

// Create the text box for the entry date
function createTextBoxEntryAmount()
{
    g_entry_amount_textbox = new JazzTextBox("id_transaction_amount_textbox", 'id_div_transaction_amount_textbox');    

    g_entry_amount_textbox.setLabelText("Betrag ");

    g_entry_amount_textbox.setLabelTextPositionAbove();

    g_entry_amount_textbox.setSize("8");

    g_entry_amount_textbox.setReadOnlyFlag(true);

    g_entry_amount_textbox.setTitle("Betrag wird gezeigt." + "\n ");

} // createTextBoxEntryAmount

// Create the text box for the entry date
function createTextBoxEntryDebitCredit()
{
    g_entry_debit_credit_textbox = new JazzTextBox("id_transaction_debit_credit_textbox", 'id_div_transaction_debit_credit_textbox');    

    g_entry_debit_credit_textbox.setLabelText("Soll/Haben ");

    g_entry_debit_credit_textbox.setLabelTextPositionAbove();

    g_entry_debit_credit_textbox.setSize("8");

    g_entry_debit_credit_textbox.setReadOnlyFlag(true);

    g_entry_debit_credit_textbox.setTitle("Soll/Haben wird gezeigt." + "\n ");

} // createTextBoxEntryDebitCredit

// Create the text box for the entry date
function createTextBoxEntryDescription()
{
    g_entry_description_textbox = new JazzTextBox("id_transaction_description_textbox", 'id_div_transaction_description_textbox');    

    g_entry_description_textbox.setLabelText("Beschreibung ");

    g_entry_description_textbox.setLabelTextPositionAbove();

    g_entry_description_textbox.setSize("60");

    g_entry_description_textbox.setReadOnlyFlag(true);

    g_entry_description_textbox.setTitle("Beschreibung wird gezeigt." + "\n ");

} // createTextBoxEntryDescription

// Create the text box for the entry date
function createTextBoxEntryDeptorName()
{
    g_entry_deptor_name_textbox = new JazzTextBox("id_transaction_name_textbox", 'id_div_transaction_name_textbox');    

    g_entry_deptor_name_textbox.setLabelText("Name des Zahlers ");

    g_entry_deptor_name_textbox.setLabelTextPositionAbove();

    g_entry_deptor_name_textbox.setSize("40");

    g_entry_deptor_name_textbox.setReadOnlyFlag(true);

    g_entry_deptor_name_textbox.setTitle("Name des Zahlers wird gezeigt." + "\n ");

} // createTextBoxEntryDeptorName

// Create the text box for the entry date
function createTextBoxEntryDeptorIban()
{
    g_entry_deptor_iban_textbox = new JazzTextBox("id_transaction_iban_textbox", 'id_div_transaction_iban_textbox');    

    g_entry_deptor_iban_textbox.setLabelText("IBAN des Zahlers ");

    g_entry_deptor_iban_textbox.setLabelTextPositionAbove();

    g_entry_deptor_iban_textbox.setSize("20");

    g_entry_deptor_iban_textbox.setReadOnlyFlag(true);

    g_entry_deptor_iban_textbox.setTitle("IBAN des Zahlers wird gezeigt." + "\n ");

} // createTextBoxEntryDeptorIban

// Create the text box for the entry date
function createTextBoxEntryDeptorAddress()
{
    g_entry_deptor_address_textbox = new JazzTextBox("id_transaction_address_textbox", 'id_div_transaction_address_textbox');    

    g_entry_deptor_address_textbox.setLabelText("Adresse des Zahlers ");

    g_entry_deptor_address_textbox.setLabelTextPositionAbove();

    g_entry_deptor_address_textbox.setSize("60");

    g_entry_deptor_address_textbox.setReadOnlyFlag(true);

    g_entry_deptor_address_textbox.setTitle("Adresse des Zahlers wird gezeigt." + "\n ");

} // createTextBoxEntryDeptorAddress



// Create the text box for the category registration number
function createTextBoxCategoryRegNumber()
{
    g_category_reg_number_textbox = new JazzTextBox("id_register_number_textbox", 'id_div_register_number_textbox');    

    g_category_reg_number_textbox.setLabelText("Reg-Nummer ");

    g_category_reg_number_textbox.setLabelTextPositionAbove();

    g_category_reg_number_textbox.setSize("10");

    g_category_reg_number_textbox.setReadOnlyFlag(true);

    g_category_reg_number_textbox.setTitle("Registrierungsnummer wird gezeigt." + "\n ");

} // createTextBoxCategoryRegNumber

// Create the text box for the category part amount
function createTextBoxCategoryPartAmount()
{
    g_category_part_amount_textbox = new JazzTextBox("id_register_amount_textbox", 'id_div_register_amount_textbox');    

    g_category_part_amount_textbox.setLabelText("Betrag ");

    g_category_part_amount_textbox.setLabelTextPositionAbove();

    g_category_part_amount_textbox.setSize("8");

    g_category_part_amount_textbox.setReadOnlyFlag(false);

    g_category_part_amount_textbox.setTitle("Teil-Betrag kann eingegeben werden." + "\n ");

} // createTextBoxCategoryPartAmount

// Create the text box for the category rest amount
function createTextBoxCategoryRestAmount()
{
    g_category_rest_amount_textbox = new JazzTextBox("id_register_rest_amount_textbox", 'id_div_register_rest_amount_textbox');    

    g_category_rest_amount_textbox.setLabelText("Rest-Betrag ");

    g_category_rest_amount_textbox.setLabelTextPositionAbove();

    g_category_rest_amount_textbox.setSize("8");

    g_category_rest_amount_textbox.setReadOnlyFlag(true);

    g_category_rest_amount_textbox.setTitle("Rest-Betrag wird gezeigt." + "\n ");

} // createTextBoxCategoryRestAmount


// Creates the category dropdown control
function createCategoryDropdown()
{
    g_category_dropdown = new JazzDropdown('id_select_category_dropdown', 'id_div_select_category_dropdown');
    
    g_current_category_number = 1;

    debugFinance('createCategoryDropdown g_current_category_number= ' + g_current_category_number);

    var dummy_category_array = [];
	dummy_category_array[0] = 'Kategorie wählen';
	dummy_category_array[1] = 'Supporter';
    dummy_category_array[2] = 'Sponsor';
    dummy_category_array[3] = 'Drucksachen';
    dummy_category_array[4] = 'Essen';
    dummy_category_array[5] = 'Gage';
    dummy_category_array[6] = 'IT';

    g_category_dropdown.setNameArray(dummy_category_array);

    g_category_dropdown.setOnchangeFunctionName("eventSelectCategoryDropDown");

    g_category_dropdown.setLabelText('Kostenstelle ');

    g_category_dropdown.setLabelTextPositionAbove();

    g_category_dropdown.setTitle('Kostenstelle wählen');

} // createCategoryDropdown


// Create the text box for the category description
function createTextBoxCategoryDescription()
{
    g_category_description_textbox = new JazzTextBox("id_register_description_textbox", 'id_div_register_description_textbox');    

    g_category_description_textbox.setLabelText("Beschreibung (Optional) ");

    g_category_description_textbox.setLabelTextPositionAbove();

    g_category_description_textbox.setSize("60");

    g_category_description_textbox.setReadOnlyFlag(false);

    g_category_description_textbox.setTitle("Beschreibung kann eingegeben werden." + "\n ");

} // createTextBoxCategoryDescription


// Creates the button for uploading a document
function createCategoryUploadDocumentButton()
{
    g_category_upload_document_button = new JazzButton('id_upload_document', 'id_div_upload_document');

    g_category_upload_document_button.setOnclickFunctionName("onClickUploadDocumentButton");

    g_category_upload_document_button.setCaption('Hochladen');

     g_category_upload_document_button.setLabelTextPositionLeft();

    g_category_upload_document_button.setLabelText("Beleg ");

    g_category_upload_document_button.setWidth("100px");

    g_category_upload_document_button.setTitle('Klick hier um einen Beleg hochzuladen. '+ 
        '\n ');

} // createCategoryUploadDocumentButton

// Creates the button for saving the changes of a category
function createCategorySaveButton()
{
    g_category_save_button = new JazzButton('id_save_category_button', 'id_div_save_category_button');

    g_category_save_button.setOnclickFunctionName("onClickSaveCategoryButton");

    g_category_save_button.setCaption('Übernehmen');

     g_category_save_button.setLabelTextPositionLeft();

    g_category_save_button.setLabelText("");

    g_category_save_button.setWidth("100px");

    g_category_save_button.setTitle('Klick hier um die Änderungen der Kategorie zu übernehmen. '+ 
        '\n ');

} // createCategorySaveButton

// Creates the button for canceling the changes of a category
function createCategoryCancelButton()
{
    g_category_cancel_button = new JazzButton('id_cancel_category_button', 'id_div_cancel_category_button');

    g_category_cancel_button.setOnclickFunctionName("onClickCancelCategoryButton");

    g_category_cancel_button.setCaption('Abbrechen');

     g_category_cancel_button.setLabelTextPositionLeft();

    g_category_cancel_button.setLabelText("");

    g_category_cancel_button.setWidth("100px");

    g_category_cancel_button.setTitle('Klick hier um die Änderungen der Kategorie abzubrechen. '+ 
        '\n ');

} // createCategoryCancelButton

///////////////////////////////////////////////////////////////////////////////////////////
///////////////////////// End Create Controls /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////