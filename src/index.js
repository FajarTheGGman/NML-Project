const app = require('./app');
const jsome = require('jsome');

const port = process.env.PORT || 5000;


if(process.argv[2]){
    app.listen(port, process.argv[2], () => {
      /* eslint-disable no-console */
        jsome({
            'Project' : 'NML - Express',
            'Version' : '1.0.0',
            'URI' : `http://${process.argv[2]}:${port}`,
        });
        /* eslint-enable no-console */
    });
}else{
    app.listen(port, () => {
      /* eslint-disable no-console */
        jsome({
            'Project' : 'NML - Express',
            'Version' : '1.0.0',
            'URI' : `http://localhost:${port}`,
        });
        /* eslint-enable no-console */
    });
}
