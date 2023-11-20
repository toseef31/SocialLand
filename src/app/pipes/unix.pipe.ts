import { Pipe, PipeTransform } from "@angular/core";
const { DateTime } = require("luxon");

@Pipe({
	name: "unix"
})
export class UnixPipe implements PipeTransform {

	transform(value: number, args1: string = "YYYY-MM-DD", args2: number = 1): unknown {
		return DateTime(value * args2).format(args1) ;
	}

}
