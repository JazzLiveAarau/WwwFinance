// File: BankCamtXml.js
// Date: 2026-06-08
// Author: Gunnar Lidén


// File content
// =============
//
//  Class for the handling of bank CAMT XML files. The bank data is defined in the file BankCamtXml.xml


class BankCamtXml
{
    // Creates the instance of the class
    // i_subdir_xml: The subdirectory for the bank XML file, e.g. XML
    // m_bank_camt_file_name: Name of the bank CAMT XML file
    // i_callback_function_name: Function that shall be called after creation (loading) of the XML object
    constructor(i_subdir_xml, i_bank_camt_file_name, i_callback_function_name) 
    {
        // Member variables
        // ================

        // The subdirectory for the bank XML file, e.g. XML
        this.m_subdir_xml = i_subdir_xml;

        // Name of the bank CAMT XML file
        this.m_bank_camt_file_name = i_bank_camt_file_name;

        // Call back function name
        this.m_callback_function_name = i_callback_function_name;

        // The xml object
        this.m_object_xml = null;

        // Object holding the tags
        this.m_tags = new BankCamtTags();

        // Flag that a node value not have been set
        // Not used for this XML file
        // this.m_not_yet_set_node_value = "NotYetSetNodeValue";

        // Loads the XML bank file, creates the XML object and calls the function m_callback_function_name
        this.loadOneXmlFile(this, this.getXmlBankCamtFileName(), this.m_callback_function_name);

    } // constructor

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Statement Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the account servicer reference, i.e. the value of the tag <AcctSvcrRef> 
    // in the XML file for a given entry (transaction) number
    getAccountIban(i_statement_number)
    {
        return this.getStatementSingleNodeValue(this.m_tags.getAccountIban(), i_statement_number);
        
    } // getAccountIban

    // Returns the account balance amount, i.e. the value of the tag <Amt>
    // i_b_opening equal true: Opening balance
    // i_b_opening equal false: Closing balance
    getAccountBalanceAmount(i_statement_number, i_b_opening)
    {
        return this.getStatementBalanceNodeValue(this.m_tags.getAccountBalanceAmount(), i_statement_number, i_b_opening);

    } // getAccountBalanceAmount


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Statement Functions /////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Entry Functions /////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
   
    // Returns the account servicer reference, i.e. the value of the tag <AcctSvcrRef> 
    // in the XML file for a given entry (transaction) number
    getAccountServicerReference(i_statement_number, i_entry_number)
    {
        return this.getEntryNodeValue(this.m_tags.getAccountServicerReference(), i_statement_number, i_entry_number);
        
    } // getAccountServicerReference

    // Returns the amount, i.e. the value of the tag <Amt> 
    // in the XML file for a given entry (transaction) number
    getAmount(i_statement_number, i_entry_number)
    {
        return this.getEntryNodeValue(this.m_tags.getAmount(), i_statement_number, i_entry_number);
        
    } // getAmount

    // Returns the booking date, i.e. the value of the tag <BookgDt> 
    // in the XML file for a given entry (transaction) number
    getBookingDate(i_statement_number, i_entry_number)
    {
        return this.getEntryNodeValue(this.m_tags.getBookingDate(), i_statement_number, i_entry_number);
        
    } // getBookingDate

    // Returns the value date, i.e. the value of the tag <ValDt> 
    // in the XML file for a given entry (transaction) number
    getValueDate(i_statement_number, i_entry_number)
    {
        return this.getEntryNodeValue(this.m_tags.getValueDate(), i_statement_number, i_entry_number);
        
    } // getValueDate

    // Returns the additional entry information, i.e. the value of the tag <AddtlNtryInf> 
    // in the XML file for a given entry (transaction) number
    getAdditionalEntryInformation(i_statement_number, i_entry_number)
    {
        return this.getEntryNodeValue(this.m_tags.getAdditionalEntryInformation(), i_statement_number, i_entry_number);
        
    } // getAdditionalEntryInformation

    ///////////////////////////////////////////////////////////////////////////
    /////// End Get Entry Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

/*

    (){return this.m_tag_additional_entry_information;}

*/

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Get Functions ///////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Record Node Value  ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the statement balance node value for a given statement number, a tag name and a flag for opening or closing balance
    getStatementBalanceNodeValue(i_record_tag, i_statement_number, i_b_opening)
    {
        var ret_data = '';


        var n_statements = this.getNumberOfStatements();

        if (i_statement_number < 1 || i_statement_number > n_statements)
        {
            alert("BankCamtXml.getStatementBalanceNodeValue Statement number is not between 1 and " + n_statements.toString());
            return ret_data;		
        }


        if (null == i_b_opening)
        {
            alert("BankCamtXml.getStatementBalanceNodeValue Input opening balance flag is null");

            return "";
        }

        var n_balances = this.getNumberOfBalances(i_statement_number);

        if (n_balances !=  2)
        {
            alert("BankCamtXml.getStatementBalanceNodeValue Number of balances is not 2 for statement number " + i_statement_number.toString());
            
            return ret_data;		
        }

        var balance_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getAccountBalance());

        var balance_type_one = balance_rec_nodes[0].getElementsByTagName(this.m_tags.getAccountBalanceType())[0].childNodes[0].nodeValue

        var balance_type_two = balance_rec_nodes[1].getElementsByTagName(this.m_tags.getAccountBalanceType())[0].childNodes[0].nodeValue;

        var balance_amount_one = balance_rec_nodes[0].getElementsByTagName(this.m_tags.getAccountBalanceAmount())[0].childNodes[0].nodeValue;

        var balance_amount_two = balance_rec_nodes[1].getElementsByTagName(this.m_tags.getAccountBalanceAmount())[0].childNodes[0].nodeValue;

        if (i_b_opening == true)
        {
            if (balance_type_one == "OPBD")

            {
                ret_data = balance_amount_one;
            }
            else if (balance_type_two == "OPBD")
            {
                ret_data = balance_amount_two;
            }
            else            {
                alert("BankCamtXml.getStatementBalanceNodeValue Opening balance not found for statement number " + i_statement_number.toString());
            }
        }
        else
        {
            if (balance_type_one == "CLBD") 

            {
                ret_data = balance_amount_one;
            }
            else if (balance_type_two == "CLBD")
            {
                ret_data = balance_amount_two;
            }
            else            {
                alert("BankCamtXml.getStatementBalanceNodeValue Closing balance not found for statement number " + i_statement_number.toString());
            }
        }

        return ret_data;

    } // getStatementBalanceNodeValue

    // Returns the statement node value for a given statement number and a tag name
    getStatementSingleNodeValue(i_record_tag, i_statement_number)
    {
        var ret_data = '';

        if (null == i_statement_number)
        {
            alert("BankCamtXml getStatementNodeValue Input statement number is null");

            return "";
        }

        var n_statements = this.getNumberOfStatements();

        if (i_statement_number < 1 || i_statement_number > n_statements)
        {
            alert("BankCamtXml.getStatementNodeValue Statement number is not between 1 and " + n_statements.toString());
            return ret_data;		
        }

        var statement_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getStatement());
            
        var statement_rec_node = statement_rec_nodes[i_statement_number - 1];

        var account_rec_nodes = statement_rec_node.getElementsByTagName(this.m_tags.getAccount());

        if (account_rec_nodes.length == 0 || account_rec_nodes.length > 1)
        {
            alert("BankCamtXml.getStatementSingleNodeValue Account node is not found or multiple accounts found");
            return ret_data;
        }

        var account_rec_node = account_rec_nodes[0];

        var xml_node_value = this.getNodeValueTagName(account_rec_node, i_record_tag);

        ret_data = xml_node_value;

        return ret_data;

    } // getStatementSingleNodeValue

    // Returns the entry node value for a given entry number and a tag name
    getEntryNodeValue(i_record_tag, i_statement_number, i_entry_number)
    {
        var ret_data = '';

        if (null == i_entry_number)
        {
            alert("BankCamtXml getEntryNodeValue Input entry number is null");

            return "";
        }

        var n_records = this.getNumberOfEntries(i_statement_number);
        
        if (i_entry_number < 1 || i_entry_number > n_records)
        {
            alert("BankCamtXml.getEntryNodeValue Record number is not between 1 and " + n_records.toString());
            return ret_data;		
        }

        var statement_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getStatement());
            
        var entry_rec_nodes = statement_rec_nodes[i_statement_number - 1].getElementsByTagName(this.m_tags.getEntry());

        var entry_rec_node = entry_rec_nodes[i_entry_number-1];
        
        var xml_node_value = this.getNodeValueTagName(entry_rec_node, i_record_tag);

        ret_data = xml_node_value;
        
        return ret_data;
        
    } // getEntryNodeValue

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Record Node Value  //////////////////////////
    ///////////////////////////////////////////////////////////////////////////  

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Node Value Functions //////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the node value. Input is an XML node and the tag name
    getNodeValueTagName(i_node, i_xml_tag)
    {	
        return i_node.getElementsByTagName(i_xml_tag)[0].childNodes[0].nodeValue;
        
    } // getNodeValueTagName

    // Returns the node value. Input is an XML node 
    getNodeValue(i_node)
    {	
        return i_node.childNodes[0].nodeValue;
        
    } // getNodeValue


    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Node Value Functions ////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Number Records ////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Returns the number of statements (bank accounts)
    getNumberOfStatements()
    {
        var ret_n_statements = -1;

        var statement_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getStatement());

        ret_n_statements = statement_rec_nodes.length;

        return ret_n_statements;

    } // getNumberOfStatements

    // Returns the number of entries (transactions) for a given statement (bank account)
    getNumberOfEntries(i_statement_number)
    {
        var ret_n_entries = -1;

        var statement_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getStatement());

        if (i_statement_number >= 1 && i_statement_number <= statement_rec_nodes.length)
        {
            var entry_rec_nodes = statement_rec_nodes[i_statement_number - 1].getElementsByTagName(this.m_tags.getEntry());

            ret_n_entries = entry_rec_nodes.length;

        }
        else
        {
            alert('Error: Statement number ' + i_statement_number + ' is out of range. Number of statements: ' + statement_rec_nodes.length);
        }

        return ret_n_entries;

    } // getNumberOfEntries

    // Returns the number of balances for a given statement (bank account)
    // Returns always two (2) for the opening balance and the closing balance, 
    // but it is possible that there are more balances in the XML file, e.g. for intermediate balances (KI ???)
    getNumberOfBalances(i_statement_number)
    {
        var ret_n_balances = -1;

        var statement_rec_nodes = this.getXmlObject().getElementsByTagName(this.m_tags.getStatement());

        if (i_statement_number >= 1 && i_statement_number <= statement_rec_nodes.length)
        {
            var balance_rec_nodes = statement_rec_nodes[i_statement_number - 1].getElementsByTagName(this.m_tags.getAccountBalance());

            ret_n_balances = balance_rec_nodes.length;

        }
        else
        {
            alert('Error: Statement number ' + i_statement_number + ' is out of range. Number of statements: ' + statement_rec_nodes.length);
        }

        return ret_n_balances;

    } // getNumberOfBalances

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// End Number Records //////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    /////// Start Utility Functions ///////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    // Returns the bank CAMT XML file name
    getXmlBankCamtFileName()
    {
        if (BankCamtXml.execApplicationOnServer()  == false)
        {
            return 'XmlTestData/' + this.m_bank_camt_file_name;
        }

        return this.m_subdir_xml + '/' +  this.m_bank_camt_file_name;

    } // getXmlBankCamtFileName

    // Returns true if the application runs on the server
    static execApplicationOnServer()
    {
        var current_base = window.location.href;

        var server_url = 'jazzliveaarau.ch';

        var index_url = current_base.indexOf(server_url);

        if (index_url >= 0) 
        {
            return true;
        }
        else
        {
            return false;
        }

    } // execApplicationOnServer    

    ///////////////////////////////////////////////////////////////////////////
    /////// End Utility Functions /////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Sets the XML object
    setXmlObject(i_object_xml)
    {
        this.m_object_xml = i_object_xml;

    } // setXmlObject

    // Returns the XML object
    getXmlObject()
    {
        return this.m_object_xml;

    } // getXmlObject    

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////// Start Object Functions //////////////////////////
    ///////////////////////////////////////////////////////////////////////////


    ///////////////////////////////////////////////////////////////////////////
    /////// Start Load Functions //////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    // Load the XML file.
    // https://codeburst.io/javascript-what-the-heck-is-a-callback-aba4da2deced
    // i_object_xml is the instance of this class. Call of this.setXmlObject
    // does not work, while this= jazz_xmlhttp 
    loadOneXmlFile(i_object_xml, i_path_file_name_xml, i_callback_function_name)
    {
    // Request server object for the XML file
    var jazz_xmlhttp = new XMLHttpRequest();
    
    // Event function: The server will return state and status 
    // from object functions open and send.
    jazz_xmlhttp.onreadystatechange = function() 
    {
        // Please note that this statement is executed several times, e.g.
        // with readyState = 2 meaning that the request is received.
        if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 200) 
        {
            var xml_object = jazz_xmlhttp.responseXML;

            i_object_xml.setXmlObject(xml_object);

            i_callback_function_name();    
        }
        else if (jazz_xmlhttp.readyState == 4 && jazz_xmlhttp.status == 404) 
        {
            alert("Error 404: File " + i_path_file_name_xml + " not found" );
        }	
    };
    
    // Open the file
    jazz_xmlhttp.open("GET", i_path_file_name_xml, true);
    
    jazz_xmlhttp.setRequestHeader('Cache-Control', 'no-cache');
        
    jazz_xmlhttp.send();	

    } // loadOneXmlFile

    ///////////////////////////////////////////////////////////////////////////
    /////// End Load Functions ////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

} //BankCamtXml

// Class defining the tags of the XML bank CAMT file
class BankCamtTags 
{
    // Creates the instance of the class
    constructor() 
    {
        // Tag for the group header. The group header contains general 
        // information about the bank statement, e.g. the date of the statement
        this.m_tag_group_header = "GrpHdr";
            // Tag for the message ID in the group header. The message ID is a 
            // unique identifier for the bank statement
            this.m_tag_message_id = "MsgId";
            // Tag for the creation date and time in the group header. 
            // The creation date and time is the date and time when the bank statement was created
            this.m_tag_creation_date_time = "CreDtTm";

        // Tag for the statement. One bank account (IBAN)
        this.m_tag_statement = "Stmt";
            // Tag for the account. The account contains the IBAN and the currency of the bank account
            this.m_tag_account = "Acct";
                // Tag for the account ID. The account ID contains the IBAN of the bank account
                this.m_tag_account_id = "Id";
                    // Tag for the account IBAN. The account IBAN contains the IBAN of the bank account
                    this.m_tag_account_iban = "IBAN";

            // Tag for the account balance. The account balance contains the balance of the bank account at the date of the statement
            // Note that there are two <Bal> elements in the XML file, one for the opening balance and one for the closing balance. 
            // The type of the balance is defined in the child node <Tp> of the <Bal> element.
            this.m_tag_account_balance = "Bal";
                // Tag for the account balance type. The account balance type contains the type of the balance, e.g. opening balance, closing balance, etc.
                this.m_tag_account_balance_type = "Tp";
                    // Tag for the account balance type code or proprietary. The account balance type code or proprietary contains the code or proprietary of the balance type, e.g. opening balance, closing balance, etc.
                    this.m_tag_account_balance_type_code_or_proprietary = "CdOrPrtry";
                        // Tag for the account balance type code. The account balance type code contains 
                        // the code of the balance type, e.g. opening balance, closing balance, etc.
                         this.m_tag_account_balance_type = "Cd";

                // Tag for the account balance amount. The account balance amount contains the amount of the balance of the bank account at the date of the statement
                this.m_tag_account_balance_amount = "Amt";
                // Tag for the account balance amount credit or debit indicator. The account balance amount 
                // credit or debit indicator contains the indicator whether the balance is a credit or a debit
                this.m_tag_account_balance_amount_credit_or_debit_indicator = "CdtDbtInd";

                // Tag for the account balance date. The account balance date contains the date of 
                // the balance of the bank account at the date of the statement. 
                // Note: Date is in the child node <Dt> !!!!
                this.m_tag_account_balance_date = "Dt";


        // Tag for the entry. One transaction on the bank account
        this.m_tag_entry = "Ntry";
            // Tag for the account servicer reference. The account servicer reference is a unique 
            // identifier for the transaction on the bank account
            this.m_tag_account_servicer_reference = "AcctSvcrRef";
            // Tag for the amount. The amount contains the amount of the transaction on the bank account
            this.m_tag_amount = "Amt";
            // Tag for the booking date. The booking date is the date when the transaction was booked on the bank account
            // Note: Date is in the child node <Dt> !!!!
            this.m_tag_booking_date = "BookgDt";
            // Tag for the value date. The value date is the date when the transaction was executed on the bank account
            // Note: Date is in the child node <Dt> !!!!
            this.m_tag_value_date = "ValDt";
            // Tag for the additional entry information. The additional entry information contains 
            // additional information about the transaction on the bank account
            this.m_tag_additional_entry_information = "AddtlNtryInf";

            // Tag for the entry details. The entry details contains additional information about the transaction on the bank account, e.g. the name of the counterparty, the IBAN of the counterparty, etc.
            this.m_tag_entry_details = "NtryDtls";

                // Tag for the transaction details. The transaction details contains additional information 
                // about the transaction on the bank account, e.g. the name of the counterparty, the IBAN of the counterparty, etc.
                this.m_tag_transaction_details = "TxDtls";
                     // Tag for the related parties. The related parties contains information about the counterparty of the 
                     // transaction on the bank account, e.g. the name of the counterparty, the IBAN of the counterparty, etc.
                    this.m_tag_related_parties = "RltdPties"; 

                    // Tag for the debtor. The debtor contains information about the debtor of the transaction on 
                    // the bank account, e.g. the name of the debtor, the IBAN of the debtor, etc.
                    this.m_tag_debtor = "Dbtr";
                        // Tag for the name of the debtor. The name of the debtor contains the name of the debtor of the transaction on the bank account
                        this.m_tag_name = "Nm";
                   
    }

    getGroupHeader(){return this.m_tag_group_header;} 
    getMessageId(){return this.m_tag_message_id;}
    getCreationDateTime(){return this.m_tag_creation_date_time;}
    

    getStatement(){return this.m_tag_statement;} 
    getAccount(){return this.m_tag_account;}
    getAccountId(){return this.m_tag_account_id;}
    getAccountIban(){return this.m_tag_account_iban;}
    getAccountBalance(){return this.m_tag_account_balance;}
    getAccountBalanceType(){return this.m_tag_account_balance_type;}
    getAccountBalanceTypeCodeOrProprietary(){return this.m_tag_account_balance_type_code_or_proprietary;}
    getAccountBalanceAmount(){return this.m_tag_account_balance_amount;}
    getAccountBalanceAmountCreditOrDebitIndicator(){return this.m_tag_account_balance_amount_credit_or_debit_indicator;}
    getAccountBalanceDate(){return this.m_tag_account_balance_date;}


    getEntry(){return this.m_tag_entry;} 
    getAccountServicerReference(){return this.m_tag_account_servicer_reference;}
    getAmount(){return this.m_tag_amount;}
    getBookingDate(){return this.m_tag_booking_date;}
    getValueDate(){return this.m_tag_value_date;}
    getAdditionalEntryInformation(){return this.m_tag_additional_entry_information;}

    getEntryDetails(){return this.m_tag_entry_details;}
    getTransactionDetails(){return this.m_tag_transaction_details;}
    getRelatedParties(){return this.m_tag_related_parties;}
    getDebtor(){return this.m_tag_debtor;}
    getName(){return this.m_tag_name;}

} // BankCamtTags
