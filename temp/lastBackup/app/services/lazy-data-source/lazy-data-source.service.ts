import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import DataSource from 'devextreme/data/data_source';

@Injectable({
  providedIn: 'root'
})
export class LazyDataSource extends DataSource{
    constructor(config: any) {

        var originalLoad = config.load;
        var firstTimeLoading = true;

        config.load = function (loadOptions: any) {
            if (loadOptions.sort)  {
                // params.sort = JSON.stringify(loadOptions.sort);
            }

            if (firstTimeLoading) {
                firstTimeLoading = false;
                firstTimeLoading = false;

                return $.when([]);
            }

            return originalLoad(loadOptions);
        };

        config.totalCount = function(loadOptions: any) {        	

            var d = new $.Deferred();
            var params = {filter: null, needCount: null};

            //Getting filter options
            if (loadOptions.filter)  {
                params.filter = JSON.stringify(loadOptions.filter);
            }         
            params.needCount = true; //You can use this parameter on the server side to ensure that a number of records is required

            $.when(params).done(function(data: any){
                d.resolve(data);
            });

            return d.promise();
        };

        super(config);
    }
}
