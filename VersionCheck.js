import packageJson from '../../package.json';

getVersionName = () => {
    let localVersion = 0;
    let serverVersion = 0;
    new Promise(function(resolve, reject) {
      var timeout = setTimeout(function() {
        reject(new Error('Request timed out'));
      }, FETCH_TIMEOUT);

      fetch(BASE_URL + '/versioninfoes')
        .then(function(response) {
          clearTimeout(timeout);
          if (response && response.status == 200) {
            return response.json();
          } else {
            reject(new Error('Response error'));
          }
        })
        .then(parsedRes => {
          // process results
          localVersion = packageJson.version;
          serverVersion = parsedRes.VersionName;

          resolve();
        })
        .catch(function(err) {
          reject(err);
        });
    })
      .then(function() {
        // request succeed
      })
      .catch(function(err) {
        // error: response error, request timeout or runtime error
      })
      .finally(f => {
        localVersion != 0 && serverVersion != 0 && localVersion != serverVersion
          ? this.showAlert()
          : null;
      });
  };
  
     <View style={styles.version}>
            <Text>Version {packageJson.version}</Text>
          </View>