import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ExternalLink } from "lucide-react";
import { SearchLink } from "@/lib/sites/types";
import Link from "next/link";

interface props {
  links: SearchLink[];
}

export function ResultCard({ links }: props) {
  return (
    <Card className="w-full" id="results">
      <CardHeader>
        <CardTitle>Generated Links</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            {links.map((link, i) => (
              <div className="flex flex-col space-y-1.5" key={i}>
                <Label htmlFor={link.name.toLowerCase()}>{link.name}</Label>
                <div className="flex flex-row gap-2">
                  <Input
                    id={link.name.toLowerCase()}
                    value={link.url}
                    readOnly
                  />
                  <Button variant={"outline"} asChild>
                    <Link
                      href={link.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Open All</Button>
      </CardFooter>
    </Card>
  );
}
