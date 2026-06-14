import { Card, CardContent } from "./card";

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="p-6">Number Of Advertisements: 120</CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">People Engaged: 1,250</CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">Service Requests: 320</CardContent>
      </Card>
    </div>
  );
}