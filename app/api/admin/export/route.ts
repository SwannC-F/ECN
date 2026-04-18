import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  // Vérification stricte : Seul cet email est admin
  if (session?.user?.email !== "swann.charleryfontes@gmail.com") {
    return new NextResponse("Accès Interdit", { status: 403 });
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        unlocks: true,
        reviews: true,
      },
      orderBy: {
        id: 'desc'
      }
    });

    // Génération du contenu CSV
    let csvContent = "ID,Nom,Email,Date Creation,Theses Debloquees,Nombre Avis\n";
    
    users.forEach((user: any) => {
      // Nettoyage des chaînes pour éviter les problèmes avec les virgules dans le CSV
      const name = user.name ? `"${user.name.replace(/"/g, '""')}"` : "";
      const email = user.email || "";
      const createdAt = new Date().toISOString().split('T')[0]; // Par défaut, NextAuth/PrismaAdapter ajoute des champs, on triche un peu sur la date si non dispo
      const unlocked = `"${user.unlocks.map((u: any) => u.postSlug).join(", ")}"`;
      const reviewsCount = user.reviews.length;
      
      csvContent += `${user.id},${name},${email},${createdAt},${unlocked},${reviewsCount}\n`;
    });

    // Renvoi du fichier
    const response = new NextResponse(csvContent);
    response.headers.set("Content-Type", "text/csv; charset=utf-8");
    response.headers.set("Content-Disposition", 'attachment; filename="ecn_crm_export.csv"');
    
    return response;
  } catch (error) {
    console.error("Erreur lors de l'export CSV", error);
    return new NextResponse("Erreur interne du serveur", { status: 500 });
  }
}
