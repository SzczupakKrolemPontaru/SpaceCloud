const sql = require('mssql');

const config = {
    user: 'admin1234',
    password: 'dupa1234.',
    server: 'users-authentication.database.windows.net',
    port: 1433,
    database: 'users-authentication-db',
    authentication: {
        type: 'default'
    },
    options: {
        encrypt: true
    }
}
console.log("Starting...");
connectAndQuery();

async function connectAndQuery() {
    try {
        var poolConnection = await sql.connect(config);

        console.log("Reading rows from the Table...");
        var resultSet = await poolConnection.request().query(`SELECT TOP 20
            p.name as ProductName
            FROM [SalesLT].[ProductCategory] pc
            JOIN [SalesLT].[Product] p ON pc.productcategoryid = p.productcategoryid`);

        console.log(`${resultSet.recordset.length} rows returned.`);

        var columns = "";
        for (var column in resultSet.recordset.columns) {
            columns += column + ", ";
        }
        console.log("%s\t", columns.substring(0, columns.length - 2));

        resultSet.recordset.forEach(row => {
            console.log("%s\t%s", row.CategoryName, row.ProductName);
        });
        poolConnection.close();
    } catch (err) {
        console.error(err.message);
    }
}