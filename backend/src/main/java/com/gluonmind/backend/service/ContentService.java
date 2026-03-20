package com.gluonmind.backend.service;

import com.gluonmind.backend.dto.*;
import com.gluonmind.backend.model.*;
import com.gluonmind.backend.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    private final FaqRepository faqRepository;
    private final ServiceRepository serviceRepository;
    private final SoftwareRepository softwareRepository;
    private final TrustedCompanyRepository trustedCompanyRepository;
    private final AnnouncementRepository announcementRepository;
    private final PublicationRepository publicationRepository;

    public ContentService(FaqRepository faqRepository,
                          ServiceRepository serviceRepository,
                          SoftwareRepository softwareRepository,
                          TrustedCompanyRepository trustedCompanyRepository,
                          AnnouncementRepository announcementRepository,
                          PublicationRepository publicationRepository) {
        this.faqRepository = faqRepository;
        this.serviceRepository = serviceRepository;
        this.softwareRepository = softwareRepository;
        this.trustedCompanyRepository = trustedCompanyRepository;
        this.announcementRepository = announcementRepository;
        this.publicationRepository = publicationRepository;
    }

    public List<Faq> getActiveFaqs() {
        return faqRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<ServiceItem> getActiveServices() {
        return serviceRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<SoftwareItem> getActiveSoftware() {
        return softwareRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<TrustedCompany> getActiveTrustedCompanies() {
        return trustedCompanyRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<Announcement> getActiveAnnouncements() {
        return announcementRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public List<Publication> getActivePublications() {
        return publicationRepository.findByActiveTrueOrderByDisplayOrderAsc();
    }

    public Page<Announcement> getAllAnnouncements(Pageable pageable) {
        return announcementRepository.findAll(pageable);
    }

    public Page<Publication> getAllPublications(Pageable pageable) {
        return publicationRepository.findAll(pageable);
    }

    public Faq saveFaq(FaqRequest request) {
        Faq faq = Faq.builder()
                .question(request.getQuestion())
                .answer(request.getAnswer())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .build();
        return faqRepository.save(faq);
    }

    public Faq updateFaq(String id, FaqRequest request) {
        Faq faq = faqRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("FAQ not found"));
        faq.setQuestion(request.getQuestion());
        faq.setAnswer(request.getAnswer());
        faq.setDisplayOrder(request.getDisplayOrder());
        faq.setActive(request.isActive());
        return faqRepository.save(faq);
    }

    public void deleteFaq(String id) {
        faqRepository.deleteById(id);
    }

    public ServiceItem saveService(ServiceRequest request) {
        ServiceItem item = ServiceItem.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .icon(request.getIcon())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .build();
        return serviceRepository.save(item);
    }

    public ServiceItem updateService(String id, ServiceRequest request) {
        ServiceItem item = serviceRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Service not found"));
        item.setTitle(request.getTitle());
        item.setDescription(request.getDescription());
        item.setIcon(request.getIcon());
        item.setDisplayOrder(request.getDisplayOrder());
        item.setActive(request.isActive());
        return serviceRepository.save(item);
    }

    public void deleteService(String id) {
        serviceRepository.deleteById(id);
    }

    public SoftwareItem saveSoftware(SoftwareRequest request) {
        SoftwareItem item = SoftwareItem.builder()
                .name(request.getName())
                .description(request.getDescription())
                .url(request.getUrl())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .build();
        return softwareRepository.save(item);
    }

    public SoftwareItem updateSoftware(String id, SoftwareRequest request) {
        SoftwareItem item = softwareRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Software not found"));
        item.setName(request.getName());
        item.setDescription(request.getDescription());
        item.setUrl(request.getUrl());
        item.setDisplayOrder(request.getDisplayOrder());
        item.setActive(request.isActive());
        return softwareRepository.save(item);
    }

    public void deleteSoftware(String id) {
        softwareRepository.deleteById(id);
    }

    public TrustedCompany saveTrustedCompany(TrustedCompanyRequest request) {
        TrustedCompany company = TrustedCompany.builder()
                .name(request.getName())
                .logoUrl(request.getLogoUrl())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .build();
        return trustedCompanyRepository.save(company);
    }

    public TrustedCompany updateTrustedCompany(String id, TrustedCompanyRequest request) {
        TrustedCompany company = trustedCompanyRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
        company.setName(request.getName());
        company.setLogoUrl(request.getLogoUrl());
        company.setDisplayOrder(request.getDisplayOrder());
        company.setActive(request.isActive());
        return trustedCompanyRepository.save(company);
    }

    public void deleteTrustedCompany(String id) {
        trustedCompanyRepository.deleteById(id);
    }

    public Announcement saveAnnouncement(AnnouncementRequest request) {
        Announcement announcement = Announcement.builder()
                .title(request.getTitle())
                .message(request.getMessage())
                .linkUrl(request.getLinkUrl())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .publishedAt(request.getPublishedAt())
                .build();
        return announcementRepository.save(announcement);
    }

    public Announcement updateAnnouncement(String id, AnnouncementRequest request) {
        Announcement announcement = announcementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Announcement not found"));
        announcement.setTitle(request.getTitle());
        announcement.setMessage(request.getMessage());
        announcement.setLinkUrl(request.getLinkUrl());
        announcement.setDisplayOrder(request.getDisplayOrder());
        announcement.setActive(request.isActive());
        announcement.setPublishedAt(request.getPublishedAt());
        return announcementRepository.save(announcement);
    }

    public void deleteAnnouncement(String id) {
        announcementRepository.deleteById(id);
    }

    public Publication savePublication(PublicationRequest request) {
        Publication publication = Publication.builder()
                .title(request.getTitle())
                .summary(request.getSummary())
                .url(request.getUrl())
                .coverImageUrl(request.getCoverImageUrl())
                .source(request.getSource())
                .displayOrder(request.getDisplayOrder())
                .active(request.isActive())
                .publishedAt(request.getPublishedAt())
                .build();
        return publicationRepository.save(publication);
    }

    public Publication updatePublication(String id, PublicationRequest request) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Publication not found"));
        publication.setTitle(request.getTitle());
        publication.setSummary(request.getSummary());
        publication.setUrl(request.getUrl());
        publication.setCoverImageUrl(request.getCoverImageUrl());
        publication.setSource(request.getSource());
        publication.setDisplayOrder(request.getDisplayOrder());
        publication.setActive(request.isActive());
        publication.setPublishedAt(request.getPublishedAt());
        return publicationRepository.save(publication);
    }

    public void deletePublication(String id) {
        publicationRepository.deleteById(id);
    }
}
