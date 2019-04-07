const { Readable } = require('stream');
const puppeteer = require('puppeteer');

// check full options list at https://github.com/GoogleChrome/puppeteer/blob/v1.8.0/docs/api.md#pagepdfoptions
const defaultOptions = {
    format: 'A4'
};

// and example based on https://github.com/westmonroe/pdf-puppeteer#readme
const convertHTMLToPDF = async (html, options = {}) => {
    if (typeof html !== 'string') {
        throw new Error(
            'Invalid Argument: HTML expected as type of string and received a value of a different type. Check your request body and request headers.'
        );
    }
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();   
    await page.setContent(html);

    try {
        const stream = new Readable();
        stream.push(await page.pdf({...defaultOptions, options}));
        stream.push(null);
        return stream;
    } catch (error) {
        console.log(error);
        throw new Error('PDF generation failed!');
    } finally {
        await browser.close();
    }
};

module.exports = convertHTMLToPDF;