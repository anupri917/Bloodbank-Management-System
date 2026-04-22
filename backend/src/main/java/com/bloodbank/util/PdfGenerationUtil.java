package com.bloodbank.util;

import com.bloodbank.entity.Donation;
import com.itextpdf.text.Document;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;

@Component
public class PdfGenerationUtil {

    public byte[] generateDonationCertificate(Donation donation) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            Font titleFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD);
            Paragraph title = new Paragraph("Donation Certificate", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingAfter(20);
            document.add(title);

            Font bodyFont = new Font(Font.FontFamily.HELVETICA, 16, Font.NORMAL);
            Paragraph body = new Paragraph(
                    "This certificate is proudly presented to:\n\n" +
                    donation.getDonor().getUsername() + "\n\n" +
                    "For their generous donation of " + donation.getBloodType() + " blood on " +
                    donation.getDonationDate() + ".\n\n" +
                    "Quantity: " + donation.getQuantityMl() + " ml\n\n" +
                    "Your contribution has helped save lives. Thank you!",
                    bodyFont
            );
            body.setAlignment(Element.ALIGN_CENTER);
            document.add(body);

            document.close();
        } catch (Exception e) {
            throw new RuntimeException("Error generating PDF", e);
        }

        return out.toByteArray();
    }
}
