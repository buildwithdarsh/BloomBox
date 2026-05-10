"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/hooks/use-user";
import { mockOrders } from "@/lib/mock/user";
import { products } from "@/lib/mock/products";

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-primary/10 rounded-2xl ${className ?? ""}`} />;
}

const tierColors: Record<string, string> = {
  seed: "bg-stone-200 text-stone-700",
  bud: "bg-green-100 text-green-700",
  bloom: "bg-pink-100 text-pink-700",
  garden: "bg-amber-100 text-amber-700",
};

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-700",
  accepted: "bg-blue-100 text-blue-700",
  preparing: "bg-yellow-100 text-yellow-700",
  "quality-check": "bg-yellow-100 text-yellow-700",
  ready: "bg-orange-100 text-orange-700",
  "out-for-delivery": "bg-purple-100 text-purple-700",
  delivered: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

export function ProfileClient() {
  const { user, isLoggedIn, login, logout } = useUser();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <h1 className="text-2xl font-light text-foreground mb-2">Sign in to view your profile</h1>
        <p className="text-muted-foreground mb-6">Track orders, manage addresses, and earn loyalty rewards.</p>
        <Button onClick={login} className="rounded-full px-8">Sign In (Demo)</Button>
      </div>
    );
  }

  const wishlisted = products.filter((p) => user?.wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 py-8 sm:py-12">
      {/* Profile header */}
      {loaded ? (
        <div className="flex flex-col items-center text-center mb-8 sm:flex-row sm:text-left sm:items-center sm:gap-4">
          {user?.avatar && (
            <div className="relative mb-3 sm:mb-0">
              <Image src={user.avatar} alt={`${user.name} avatar`} width={72} height={72} className="rounded-full object-cover ring-2 ring-primary/20 ring-offset-2 ring-offset-background" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-primary-foreground" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
            </div>
          )}
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground">{user?.name}</h1>
            <div className="flex items-center justify-center sm:justify-start gap-2 mt-1.5">
              <Badge className={tierColors[user?.loyaltyTier ?? "seed"]}>
                {user?.loyaltyTier?.charAt(0).toUpperCase()}{user?.loyaltyTier?.slice(1)} Tier
              </Badge>
              <span className="text-xs text-muted-foreground">{user?.loyaltyPoints?.toLocaleString("en-IN")} Bloom Points</span>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={logout} className="rounded-full mt-3 sm:mt-0">
            Sign Out
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center mb-8 sm:flex-row sm:items-center sm:gap-4">
          <Skeleton className="w-[72px] h-[72px] rounded-full mb-3 sm:mb-0" />
          <div className="space-y-2 flex-1 flex flex-col items-center sm:items-start">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      )}

      <Tabs defaultValue="orders">
        <TabsList className="mb-6 w-full justify-center bg-card border border-border">
          <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Orders</TabsTrigger>
          <TabsTrigger value="wishlist" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Wishlist</TabsTrigger>
          <TabsTrigger value="addresses" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Addresses</TabsTrigger>
          <TabsTrigger value="occasions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Occasions</TabsTrigger>
        </TabsList>

        {/* Orders */}
        <TabsContent value="orders">
          {loaded ? (
            <div className="space-y-4">
              {mockOrders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">{order.id}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </div>
                      <Badge className={statusColors[order.status]}>
                        {order.status.replace(/-/g, " ")}
                      </Badge>
                    </div>
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 mb-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="56px" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {item.product.sizes.find((s) => s.size === item.size)?.label} · Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-sm border-t border-border pt-3">
                      <span className="text-muted-foreground">{order.floristName}</span>
                      <span className="font-medium">₹{order.total.toLocaleString("en-IN")}</span>
                    </div>
                    {order.deliveryPhoto && (
                      <div className="mt-3 p-3 bg-muted/50 rounded-xl">
                        <p className="text-xs text-muted-foreground mb-2">Delivery Photo Proof</p>
                        <Image src={order.deliveryPhoto} alt="Delivery proof photograph" width={120} height={120} className="rounded-lg object-cover" />
                      </div>
                    )}
                    {order.rating && (
                      <div className="mt-3 flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Your rating:</span>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < order.rating! ? "text-amber-400" : "text-border"}`} fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
            </div>
          )}
        </TabsContent>

        {/* Wishlist */}
        <TabsContent value="wishlist">
          {wishlisted.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {wishlisted.map((p) => (
                <Link key={p.id} href={`/shop/${p.slug}`} className="group">
                  <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-md transition-all">
                    <div className="relative aspect-square overflow-hidden">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />
                    </div>
                    <div className="p-3">
                      <h3 className="text-sm font-medium truncate">{p.name}</h3>
                      <span className="text-sm text-muted-foreground">from ₹{p.sizes[0].price}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12">Your wishlist is empty.</p>
          )}
        </TabsContent>

        {/* Addresses */}
        <TabsContent value="addresses">
          <div className="grid sm:grid-cols-2 gap-4">
            {user?.addresses.map((addr) => (
              <Card key={addr.id}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-[10px]">{addr.label}</Badge>
                    {addr.isDefault && <Badge className="text-[10px] bg-primary/10 text-primary">Default</Badge>}
                  </div>
                  <p className="text-sm font-medium">{addr.name}</p>
                  <p className="text-xs text-muted-foreground">{addr.line1}</p>
                  {addr.line2 && <p className="text-xs text-muted-foreground">{addr.line2}</p>}
                  <p className="text-xs text-muted-foreground">{addr.city}, {addr.state} {addr.pincode}</p>
                  <p className="text-xs text-muted-foreground mt-1">{addr.phone}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Saved Occasions */}
        <TabsContent value="occasions">
          {user?.occasions && user.occasions.length > 0 ? (
            <div className="space-y-4">
              {user.occasions.map((occ) => {
                const occasionDate = new Date(occ.date);
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const diffMs = occasionDate.getTime() - today.getTime();
                const daysAway = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
                const monthShort = occasionDate.toLocaleDateString("en-IN", { month: "short" }).toUpperCase();
                const dayNum = occasionDate.getDate();

                const isUpcoming = daysAway > 0 && daysAway <= 30;
                const occasionIcon = occ.name.toLowerCase().includes("birthday")
                  ? "🎂"
                  : occ.name.toLowerCase().includes("anniversary")
                    ? "💍"
                    : "🌸";

                return (
                  <Card key={occ.id} className={`overflow-hidden transition-all ${isUpcoming ? "border-primary/30 shadow-sm" : ""}`}>
                    <CardContent className="p-0">
                      <div className="flex items-stretch">
                        {/* Date block */}
                        <div className={`flex flex-col items-center justify-center px-4 py-4 min-w-[72px] ${isUpcoming ? "bg-primary/10" : "bg-muted/50"}`}>
                          <span className="text-[10px] font-medium tracking-wider text-muted-foreground">{monthShort}</span>
                          <span className="text-2xl font-semibold text-foreground leading-tight">{dayNum}</span>
                          <span className="text-lg mt-0.5">{occasionIcon}</span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 p-4 flex flex-col justify-center gap-1.5">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-semibold text-foreground">{occ.name}</p>
                            {isUpcoming && (
                              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-primary/10 text-primary">
                                Soon
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            For {occ.recipientName}
                          </p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {daysAway > 0 ? `${daysAway} day${daysAway === 1 ? "" : "s"} away` : daysAway === 0 ? "Today!" : "Passed"}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[11px] text-muted-foreground">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                              </svg>
                              {occ.reminderDaysBefore}d reminder
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Add occasion CTA */}
              <button className="w-full py-4 border-2 border-dashed border-border rounded-2xl text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add an occasion
              </button>
            </div>
          ) : (
            <div className="text-center py-16 px-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-muted/50 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌸</span>
              </div>
              <p className="text-sm font-medium text-foreground mb-1">No saved occasions yet</p>
              <p className="text-xs text-muted-foreground mb-6">Save birthdays, anniversaries & special dates so you never miss sending flowers.</p>
              <Button variant="outline" className="rounded-full px-6 text-sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add your first occasion
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
